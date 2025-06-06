'use server'

import {prisma} from "@/lib/prismaClient";
import {getAuth} from "@/features/auth/authActions";
import {ActionState, toActionState} from "@/utils/formUtils";
import {redirect} from "next/navigation";
import {getAuthOrRedirect} from "@/utils/authUtils";
import {setCookie} from "@/actions/cookies";
import {z} from "zod";
import {revalidatePath} from "next/cache";


export const getMemberships = async (organizationId: string) => {
  const {user} = await getAuthOrRedirect();

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
  const {user} = await getAuthOrRedirect();

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
