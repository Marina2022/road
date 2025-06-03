import {getAuth} from "@/features/auth/authActions";
import {User} from "lucia";
import {redirect} from "next/navigation";
import {getBaseUrl} from "@/utils/testEnv";
import {generateRandomToken} from "@/utils/crypto";


export const getAuthOrRedirect = async () => {
  const auth = await getAuth()
  
  if (!auth.user) {
    redirect('/sign-in')    
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


export const generatePasswordResetLink = async (userId: string) => {
      
  // const passwordResetLink = baseUrl + "/password-reset?token=" + token
  
  const baseUrl = getBaseUrl()  
  const tokenId = generateRandomToken()  
  const passwordResetLink = baseUrl + "/password-reset/" + tokenId

  return {passwordResetLink, tokenId}  
}


