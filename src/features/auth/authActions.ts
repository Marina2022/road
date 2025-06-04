'use server'

import {z} from "zod";
import {ActionState, fromErrorToState, toActionState} from "@/utils/formUtils";
import {prisma} from "@/lib/prismaClient";
import {hash, verify} from "@node-rs/argon2";
import {lucia} from "@/lib/lucia";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {cache} from "react";
import {generatePasswordResetLink, getAuthOrRedirect} from "@/utils/authUtils";
import {generateRandomToken, hashToken} from "@/utils/crypto";
import {setCookie} from "@/actions/cookies";
import {hashPassword, verifyPasswordHash} from "@/utils/passwordUtils";
import sendEmailPasswordReset from "@/features/auth/send-email-password-reset";
import {inngest} from "@/lib/inngest";

export const signUp = async (_state: ActionState, formData: FormData): Promise<ActionState> => {

  const signUpSchema = z.object({
    username: z.string().min(1).max(191).refine(val => !val.includes(' '), 'Username cannot contain spaces'),
    email: z.string().min(1, {message: "Email is required"}).email(),
    password: z.string().min(3).max(191),
    confirmPassword: z.string().min(3).max(191),
  })
    .superRefine(({password, confirmPassword}, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          message: 'Passwords do not match',
          path: ['confirmPassword']
        })
      }
    })

  try {
    const {username, email, password} = signUpSchema.parse(
      Object.fromEntries(formData)
    )

    const passwordHash = await hash(password)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      }
    })

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    const cookiesStore = await cookies()
    cookiesStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
  } catch (error) {
    return fromErrorToState(error, formData)
  }
  redirect('/tickets')
}

export const signIn = async (_state: ActionState, formData: FormData): Promise<ActionState> => {

  const signInSchema = z.object({
    email: z.string().min(1, {message: "Email is required"}).email(),
    password: z.string().min(3).max(191),
  })

  try {
    const {email, password} = signInSchema.parse(
      Object.fromEntries(formData)
    )

    const user = await prisma.user.findUnique({
      where: {email}
    })

    if (!user) return toActionState('ERROR', 'Incorrect email or password')
    const validPassword = await verify(user.passwordHash, password)

    if (!validPassword) return toActionState('ERROR', 'Incorrect email or password')

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    const cookiesStore = await cookies()
    cookiesStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
//    return toActionState('SUCCESS', 'Signed in')

  } catch (error) {
    return fromErrorToState(error, formData)
  }
  redirect('/tickets')
}

export const getAuth = cache(async () => {
  const cookiesStore = await cookies()
  const sessionId = cookiesStore.get(lucia.sessionCookieName)

  if (!sessionId) return {
    user: null,
    session: null
  }
  const result = await lucia.validateSession(sessionId.value)

  // тут мы обновляем куку, чтобы она сама собой не иссякла и посредине активности не выкинула пользователя
  // в бд сессию не обновляем, т.е. срок сессии остается как был? 30 дней кстати, в принципе норм

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      cookiesStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookiesStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
  } catch {
    // do nothing if invoked in RSC 
  }
  return result
})

export const signOut = async () => {
  const cookiesStore = await cookies()
  cookiesStore.delete(lucia.sessionCookieName)

  const auth = await getAuth()
  if (!auth.session) {
    redirect('/sign-in')
  }

  await lucia.invalidateSession(auth.session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookiesStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  redirect('/sign-in')
}

export const passwordReset = async (tokenId: string, _state: ActionState, formData: FormData): Promise<ActionState> => {

  const resetPasswordSchema = z.object({
    password: z.string().min(3).max(191),
    confirmPassword: z.string().min(3).max(191),
  })
    .superRefine(({password, confirmPassword}, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          message: 'Passwords do not match',
          path: ['confirmPassword']
        })
      }
    })

  try {
    const {password} = resetPasswordSchema.parse(
      Object.fromEntries(formData)
    )

    const resetPasswordRecord = await prisma.passwordResetToken.findUnique({
      where: {
        tokenHash: hashToken(tokenId)
      }
    })

    if (!resetPasswordRecord || resetPasswordRecord.expiresAt.getTime() < Date.now()) {
      return fromErrorToState(new Error("Invalid or expired token"), formData)
    }

    await prisma.session.deleteMany({
      where: {
        userId: resetPasswordRecord.userId
      }
    })

    await prisma.passwordResetToken.deleteMany({
      where: {userId: resetPasswordRecord.userId}
    })

    await prisma.user.update({
      data: {
        passwordHash: await hashPassword(password),
        //passwordHash: await hash(password),        
      },
      where: {id: resetPasswordRecord.userId}
    })

    await setCookie({key: 'toast', value: 'Password reset successfully'})


  } catch (error) {
    return fromErrorToState(error, formData)
  }

  redirect('/sign-in')
}




export const passwordChange = async (_state: ActionState, formData: FormData): Promise<ActionState> => {

  const passwordChangeSchema = z.object({
    password: z.string().min(1, {message: "Password is required"}),
  })

  try {
    const {password} = passwordChangeSchema.parse(
      Object.fromEntries(formData)
    )

    const {user} = await getAuthOrRedirect()
    
    const userFromDB = await prisma.user.findUnique({where: {id: user.id}})    
    if (!userFromDB) return toActionState('ERROR', "Юзера нет в БД")
    
    if (await verifyPasswordHash(userFromDB.passwordHash, password)  ) {
      return toActionState('ERROR', "Password is incorrect", formData)
    } 
    
    // const {passwordResetLink, tokenId} = await generatePasswordResetLink(user.id)

    const tokenId = generateRandomToken()

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await prisma.passwordResetToken.deleteMany({
      where: {userId: user.id}
    })

    await prisma.passwordResetToken.create({
      data: {
        tokenHash: hashToken(tokenId),
        expiresAt: tomorrow,
        userId: user.id
      }
    })

    // console.log(passwordResetLink)

    await inngest.send({
      name: "app/password.password-reset",
      data: {userId: user.id, tokenId: tokenId}
    })
    
    // await sendEmailPasswordReset({name: user.username, email: 'marusiiiia@yandex.ru', url: passwordResetLink})

    
    return toActionState('SUCCESS', "Check your email for a reset link")
  } catch (error) {
    return fromErrorToState(error, formData)
  }
}

//*************************

export const passwordForgot = async (_state: ActionState, formData: FormData): Promise<ActionState> => {

  const signInSchema = z.object({
    email: z.string().min(1, {message: "Email is required"}).email(),
  })

  try {
    const {email} = signInSchema.parse(
      Object.fromEntries(formData)
    )

    const user = await prisma.user.findUnique({
      where: {email}
    })

    if (!user) return fromErrorToState(new Error("Incorrect email"), formData)

    // const {passwordResetLink, tokenId} = await generatePasswordResetLink(user.id)


    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await prisma.passwordResetToken.deleteMany({
      where: {userId: user.id}
    })

    const tokenId = generateRandomToken()

    await prisma.passwordResetToken.create({
      data: {
        tokenHash: hashToken(tokenId),
        expiresAt: tomorrow,
        userId: user.id
      }
    })


    await inngest.send({
      name: "app/password.password-reset",
      data: {userId: user.id, tokenId}
    })


    return toActionState('SUCCESS', "Check your email for a reset link")
       
    
  } catch (error) {
    return fromErrorToState(error, formData)
  }
}