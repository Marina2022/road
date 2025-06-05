import {getAuth} from "@/features/auth/authActions";
import {User} from "lucia";
import {redirect} from "next/navigation";
import {getBaseUrl} from "@/utils/testEnv";
import {prisma} from "@/lib/prismaClient";
import {generateRandomCode} from "@/utils/crypto";
import {getOrganizationsByUser} from "@/features/organization/organizationActions";

type Options = {
  checkActiveOrganization?: boolean;
}


export const getAuthOrRedirect = async (options?: Options) => {

  const {checkActiveOrganization = true} = options ?? {}
  
  const auth = await getAuth()

  if (!auth.user) {
    redirect('/sign-in')
  }

  const userFromDB = await prisma.user.findUnique({where: {id: auth.user.id}})

  if (!userFromDB) {
    redirect('/sign-in')
  }

  if (!userFromDB.emailVerified) {
    redirect('/email-verification')
  }

  const organizations = await getOrganizationsByUser()
  if (!organizations.length) {
    redirect('/onboarding')
  }

  if (checkActiveOrganization) {
    if (!organizations.some(organization => organization.membershipByUser.isActive)) {
      redirect('/onboarding/select-active-organization')
    }
  }
  
  return auth
}


type Entity = {
  userId: string | undefined | null;
}

export const isOwner = (user: User | null | undefined, entity: Entity | null | undefined) => {
  if (!entity || !user) return false
  if (!entity?.userId) return false

  return entity.userId === user.id
}


export const generatePasswordResetLink = async (userId: string, tokenId: string) => {
  // const passwordResetLink = baseUrl + "/password-reset?token=" + token

  const baseUrl = getBaseUrl()
  const passwordResetLink = baseUrl + "/password-reset/" + tokenId
  return {passwordResetLink, tokenId}
}

export const generateEmailVerificationToken = async (userId: string, email: string) => {
  const code = generateRandomCode()
  await prisma.emailVerificationToken.deleteMany({
    where: {userId}
  })

  await prisma.emailVerificationToken.create({
    data: {
      code,
      email,
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      userId
    }
  })
  return code
}






