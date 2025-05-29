'use server'

import {prisma} from "@/lib/prismaClient";
import {revalidatePath} from "next/cache";
import {$Enums} from "@prisma/client";
import {cache} from "react";
import {redirect} from "next/navigation";
import {z} from "zod";
import {ActionState, fromErrorToState} from "@/utils/formUtils";
import {setCookie} from "@/actions/cookies";
import {fromDollarsToCentsNoMoneyFormat} from "@/utils/currency";
import {getAuth} from "@/features/auth/authActions";
import {getAuthOrRedirect, isOwner} from "@/utils/authUtils";
import TicketStatus = $Enums.TicketStatus;


type getTicketsParams = {
  userId?: string;
  search?: string;
}

export const getTickets = async ({userId, search}: getTicketsParams) => {

  try {
    return await prisma.ticket.findMany({
      where: {
        userId,
        ...(search && {
          OR: [
            {title: {contains: search, mode: 'insensitive'}},
            {content: {contains: search, mode: 'insensitive'}}
          ]
        })
      },
      orderBy: {
        updatedAt: 'desc'
      },
      include: {
        user: {
          select: {
            username: true,
          }
        }
      }
    })
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getTicket = cache(async (id: number) => {
  try {
    return await prisma.ticket.findFirst(
      {
        where: {
          id: id
        },
        include: {
          user: {
            select: {
              username: true,
            }
          }
        }
      }
    )
  } catch (err) {
    console.log(err)
    return null
  }
})

export const deleteTicket = async (id: number): Promise<ActionState> => {

  const formData = new FormData() // заглушка

  const {user} = await getAuthOrRedirect()
  if (!isOwner(user, await getTicket(id))) {
    return fromErrorToState(new Error('Not yours!'), formData)
  }

  try {
    await prisma.ticket.delete(
      {
        where: {
          id: id
        }
      }
    )
    revalidatePath('/tickets')
  } catch (err) {
    console.log(err)
    return fromErrorToState(new Error('Deleting error'), formData)
  }
  redirect('/tickets')
}

const updateTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format is bad"),
  bounty: z.coerce.number().positive()
})

export const createTicket = async (state: ActionState, formData: FormData): Promise<ActionState> => {

  const {user} = await getAuth()
  if (!user) return fromErrorToState(new Error('User is not authenticated'), formData)

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const deadline = formData.get('deadline') as string
  const bounty = formData.get('bounty')

  try {
    const data = updateTicketSchema.parse({title, content, deadline, bounty})
    const dataForDB = {...data, bounty: fromDollarsToCentsNoMoneyFormat(data.bounty), userId: user.id}

    await prisma.ticket.create(
      {
        data: dataForDB
      }
    )
    revalidatePath('/tickets')
    return {
      message: 'Ticket created',
      payload: formData,
      fieldErrors: {},
      timestamp: Date.now(),
      status: 'SUCCESS'
    }
  } catch (err) {
    return fromErrorToState(err, formData)
  }
}

export const updateTicket = async (id: number, state: ActionState, formData: FormData): Promise<ActionState> => {

  const {user} = await getAuthOrRedirect()
  if (!isOwner(user, await getTicket(id))) return fromErrorToState(new Error('It is not your ticket'), formData)

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const deadline = formData.get('deadline') as string
  const bounty = formData.get('bounty')

  try {
    const data = updateTicketSchema.parse({title, content, deadline, bounty})
    const dataForDB = {...data, bounty: fromDollarsToCentsNoMoneyFormat(data.bounty)}
    await prisma.ticket.update(
      {
        data: dataForDB,
        where: {id}
      }
    )
    revalidatePath('/tickets')

  } catch (err) {
    console.log(err)
    return fromErrorToState(err, formData)
  }

  await setCookie({key: 'toast', value: 'Ticket updated'})
  redirect(`/tickets/${id}`)
}

export const updateTicketStatus = async (id: number, status: TicketStatus): Promise<string> => {
  const {user} = await getAuthOrRedirect()
  if (!isOwner(user, await getTicket(id))) return "NOT YOURS"

  try {
    await prisma.ticket.update(
      {
        data: {status},
        where: {id}
      }
    )
    revalidatePath('/tickets')
    return "SUCCESS"

  } catch (err) {
    console.log(err)
    return "ERROR"
  }
}