'use server'

import {prisma} from "@/lib/prismaClient";
import {getAuth} from "@/features/auth/authActions";
import {ActionState, fromErrorToState, toActionState} from "@/utils/formUtils";
import {redirect} from "next/navigation";
import {generateEmailInvitationLink, getAuthOrRedirect} from "@/utils/authUtils";
import {setCookie} from "@/actions/cookies";
import {z} from "zod";
import {revalidatePath} from "next/cache";
import sendEmailPasswordReset from "@/features/auth/send-email-password-reset";
import {hashToken} from "@/utils/crypto";


export const getMemberships = async (organizationId: string) => {
  await getAuthOrRedirect();

  const members = await prisma.membership.findMany({
    where: {
      organizationId
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
          emailVerified: true,
        }
      },
      organization: {
        select: {
          name: true
        }
      }
    }
  })
  return members;
}

// single
export const getMembership = async ({organizationId, userId}: { organizationId: string, userId: string }) => {
  getAuthOrRedirect();

  const membership = await prisma.membership.findUnique({
    where: {
      membershipId: {
        userId, organizationId
      }
    }
  })
  return membership;
}

export const getAdminOrRedirect = async (organizationId: string) => {

  const auth = await getAuthOrRedirect();
  const membership = await getMembership({organizationId, userId: auth.user.id})

  if (!membership || membership.membershipRole !== 'ADMIN') {
    redirect('/organizations');
  }

  return {...auth, membership};

}

export const getOrganizationsByUser = async () => {

  const {user} = await getAuth()
  const organizations = await prisma.organization.findMany({
      where: {
        memberships: {
          some: {
            userId: user?.id
          }
        }
      }, include: {
        memberships: {
          where: {
            userId: user?.id
          }
        },
        _count: {
          select: {
            memberships: true
          }
        }
      }
    }
  )
  return organizations.map(({memberships, ...organization}) => ({
    ...organization,
    membershipByUser: memberships[0]
  }))
}

export const createOrganization = async (_state: ActionState, formData: FormData): Promise<ActionState> => {

  const {user} = await getAuth()
  if (!user) redirect('/sign-in')

  const createOrganizationSchema = z.object({
    name: z.string().min(1).max(191)
  })


  try {

    const {name} = createOrganizationSchema.parse(Object.fromEntries(formData))

    await prisma.$transaction([
      prisma.membership.updateMany({
        where: {
          userId: user.id,
        },
        data: {
          isActive: false
        }
      }),

      prisma.organization.create({
        data: {
          name,
          memberships: {
            create: {
              userId: user.id,
              isActive: true,
              membershipRole: "ADMIN"
            }
          }
        }
      })
    ])

  } catch (error) {
    console.log(error)
    return toActionState('ERROR', 'too bad')
  }

  setCookie({key: 'toast', value: 'Organization created'})
  redirect('/organizations')
}


export const switchOrganization = async (organizationId: string, _state: ActionState, _formData: FormData): Promise<ActionState> => {

  const {user} = await getAuthOrRedirect({checkActiveOrganization: false})

  const organizations = await getOrganizationsByUser()
  const canSwitch = organizations.some(organization => organization.id === organizationId)

  if (!canSwitch) {
    return toActionState('ERROR', 'Not a member of this organization')
  }

  try {

    await prisma.$transaction([
      prisma.membership.updateMany({
        where: {
          userId: user.id,
          organizationId: {
            not: organizationId
          }
        },
        data: {
          isActive: false
        }
      }),

      prisma.membership.update({
        where: {
          membershipId: {
            userId: user.id,
            organizationId
          }
        },
        data: {
          isActive: true
        }
      })
    ])


  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }

    return toActionState('ERROR', 'Не шмогла я')
  }

  revalidatePath('/organizations')
  return toActionState("SUCCESS", 'Organization switched successfully')
}


export const deleteOrganization = async (organizationId: string, _state: ActionState, _formData: FormData): Promise<ActionState> => {

  // await getAuthOrRedirect({checkActiveOrganization: false})  
  await getAdminOrRedirect(organizationId)

  // проверить еще можно, является ли юзер членом этой орг-ии

  try {

    await prisma.organization.delete({
        where: {
          id: organizationId
        }
      }
    )


  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }

    return toActionState('ERROR', 'Не удалилось')
  }

  // revalidatePath('/organizations')

  return toActionState("SUCCESS", 'Organization deleted successfully')
}


export const deleteMembership = async ({userId, organizationId}: {
  userId: string,
  organizationId: string
}, _state: ActionState, _formData: FormData): Promise<ActionState> => {
  await getAuthOrRedirect({checkActiveOrganization: false})
  // проверить еще можно, является ли юзер членом этой орг-ии
  // еще проверки - если роль не Админ, то юзер может только свой мембершип удалить 

  const memberships = await getMemberships(organizationId)
  const isLastMembership = (memberships ?? []).length === 1
  if (isLastMembership) return toActionState('ERROR', "You can't delete the last member!")

  try {

    await prisma.membership.delete({
        where: {
          membershipId: {
            userId,
            organizationId,
          }
        }
      }
    )

  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }

    return toActionState('ERROR', 'Не удалилось - deleteMembership')
  }
  return toActionState("SUCCESS", 'Membership deleted successfully')
}


type PermissionKey = "canDeleteTicket"


export const togglePermission = async ({userId, organizationId, permissionKey}: {
  userId: string,
  organizationId: string,
  permissionKey: PermissionKey
}, _state: ActionState, _formData: FormData): Promise<ActionState> => {

  await getAdminOrRedirect(organizationId)

  if (permissionKey === "canDeleteTicket") {
    const membership = await getMembership({organizationId, userId})

    if (!membership) {
      return toActionState('ERROR', 'Membership not found')
    }

    try {
      await prisma.membership.update({
        where: {
          membershipId: {
            organizationId, userId
          }
        },
        data: {

          [permissionKey]: membership[permissionKey] === true ? false : true
        }
      })

    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }

      return toActionState('ERROR', 'Не поменялсо')
    }
  }
  revalidatePath(`/organizations/${organizationId}/memberships`)
  return toActionState("SUCCESS", 'Membership changed successfully')
}


export const getActiveMembership = async () => {
  const {user} = await getAuth()
  if (!user) return null

  const activeMembership = await prisma.membership.findFirst({
    where: {
      userId: user.id,
      isActive: true
    }
  })

  return activeMembership
}


export const getActiveOrganization = async () => {

  const organizations = await getOrganizationsByUser()
  if (!organizations.length) {
    return null
  }

  const activeOrganization = organizations.find((organization) => organization.membershipByUser.isActive)
  if (!activeOrganization) redirect('/onboarding/select-active-organization')

  return activeOrganization
}


export const getInvitations = async ({organizationId}: { organizationId: string }) => {

  await getAdminOrRedirect(organizationId)
  const invitations = await prisma.invitation.findMany({
    where: {
      organizationId  // select потом еще добавить можно, чтобы хэши не сервить
    },
    include: {
      invitedByUser: true
    }
  })

  return invitations
}

const createInvitationSchema = z.object({
  email: z.string().min(1, {message: 'is required'}).max(191).email()
})

export const createInvitation = async (organizationId: string,  _state: ActionState, formData: FormData): Promise<ActionState> => {
  const {user} = await getAdminOrRedirect(organizationId)
  
  try {
    const {email} =  createInvitationSchema.parse({
      email: formData.get('email')
    })    
    // + Добавить проверку, что в орг-ии нет члена с таким имейлом. 
    
    
    const emailInvitationLink = await generateEmailInvitationLink({
      userId: user.id,
      organizationId,
      email      
    })

    console.log('emailInvitationLink = ', emailInvitationLink)

    const result = await sendEmailPasswordReset({name: user.username, email: email, url: emailInvitationLink})
    
  } catch (error) {
    return fromErrorToState(error, formData)
  }

  revalidatePath(`/organizations/${organizationId}/invitations`)
  return toActionState('SUCCESS', 'User invited to organization') 
 
}

export const acceptInvitation = async (tokenId: string, state: ActionState, formData: FormData): Promise<ActionState> => {
  // const {user} = await getAuth()

  try {
    
    const tokenHash = hashToken(tokenId)
    const invitation = await prisma.invitation.findFirst({
      where: {
        tokenHash,
      }
    })
    
    if (!invitation) return toActionState('ERROR', 'Invalid invitation token')
    const user = await prisma.user.findUnique({
      where: {
        email: invitation.email
      }
    })
    
     // if (!user) - значит, не зареган!
    
    if (user) {
      prisma.$transaction([
        
        prisma.invitation.delete({where: {tokenHash}}),
        
        prisma.membership.create({
          data: {
            organizationId: invitation.organizationId,
            userId: user.id,
            membershipRole: 'MEMBER',
            isActive: false              
          }
        })                
      ])
    }

        
  } catch (error) {
    return fromErrorToState(error, formData)
  }
  
  setCookie({key: 'toast', value: 'Invitation accepted'})
  redirect('/sign-in')
  
}





