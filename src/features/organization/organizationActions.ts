'use server'

import {prisma} from "@/lib/prismaClient";
import {getAuth} from "@/features/auth/authActions";
import {ActionState, toActionState} from "@/utils/formUtils";
import {redirect} from "next/navigation";
import {generateEmailVerificationToken, getAuthOrRedirect} from "@/utils/authUtils";
import {inngest} from "@/lib/inngest";
import {lucia} from "@/lib/lucia";
import {cookies} from "next/headers";
import {setCookie} from "@/actions/cookies";
import {z} from "zod";
import {revalidatePath} from "next/cache";

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

    await prisma.organization.create({
      data: {
        name,
        memberships: {
          create: {
            userId: user.id,
            isActive: false
          }
        }
      }
    })

  } catch (error) {
    return toActionState('ERROR', 'too bad')
  }

  setCookie({key: 'toast', value: 'Organization created'})
  redirect('/organization')
}


export const switchOrganization = async (organizationId: string, _state: ActionState, _formData: FormData): Promise<ActionState> => {

  const {user} = await getAuthOrRedirect({checkActiveOrganization: false})
  
  const organizations = await getOrganizationsByUser()
  const canSwitch = organizations.some(organization => organization.id === organizationId)
  
  if (!canSwitch) {
    return toActionState('ERROR', 'Not a member of this organization')
  }
  
  try {

    await prisma.membership.updateMany({
      where: {
        userId: user.id,
        organizationId: {
          not: organizationId
        }
      },
      data: {
        isActive: false
      }
    })

    await prisma.membership.update({
      where: {
        organizationId_userId: {
          userId: user.id,
          organizationId
        }
      },
      data: {
        isActive: true
      }
    })
  } catch (error) {
    return toActionState('ERROR', 'Не шмогла я')
  }

  revalidatePath('/organization')
  return toActionState("SUCCESS", 'Organization switched successfully')
}
