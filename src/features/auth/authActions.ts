'use server'

import {z} from "zod";
import {ActionState, fromErrorToState, toActionState} from "@/utils/formUtils";
import {prisma} from "@/lib/prismaClient";
import {hash, verify} from "@node-rs/argon2";
import {lucia} from "@/lib/lucia";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {cache} from "react";

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