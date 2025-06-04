import sendEmailPasswordReset from "@/features/auth/send-email-password-reset";
import {generatePasswordResetLink} from "@/utils/authUtils";
import {prisma} from "@/lib/prismaClient";
import {inngest} from "@/lib/inngest";


export type PasswordResetEventArgs = {
  data: {
    userId: string, tokenId: string  
  }  
}

export const passwordResetEvent = inngest.createFunction(
  {id: "password-reset"},
  {event: "app/password.password-reset"},
  async ({event}) =>{
    const {userId, tokenId} = event.data

    const user = await prisma.user.findUniqueOrThrow({
      where: {id: userId}
    })
    
    const {passwordResetLink} = await generatePasswordResetLink(userId, tokenId)
    
    const result = await sendEmailPasswordReset({name: user.username, email: 'marusiiiia@yandex.ru', url: passwordResetLink})
    // email надо из user доставать
    
    // - resend вернет в результате поле error, т.е. не ошибку, а именно поле, нужно бросать ошибку отдельно
    
    if (result.error) {
      throw new Error(result.error.name +  ': ' + result.error.message) 
    }
    
    return {event, body: result}
  }
)