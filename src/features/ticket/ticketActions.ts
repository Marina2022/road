'use server'

import {prisma} from "@/lib/prismaClient";
import {revalidatePath} from "next/cache";
import {$Enums, Ticket} from "@prisma/client";
import {cache} from "react";
import {redirect} from "next/navigation";
import {z} from "zod";
import {ActionState, fromErrorToState} from "@/utils/formUtils";
import {setCookie} from "@/actions/cookies";
import {fromDollarsToCentsNoMoneyFormat} from "@/utils/currency";
import {getAuth} from "@/features/auth/authActions";
import TicketStatus = $Enums.TicketStatus;
import {isOwner} from "@/utils/authUtils";

export const getTickets = async () => {
  try {
    return await prisma.ticket.findMany({
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

export const deleteTicket = async (id: number): Promise<void | { message: string }> => {
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
    return {message: 'Deleting error'}
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
    console.log(err)
    return fromErrorToState(err, formData)
  }
}

export const updateTicket = async (id: number, state: ActionState, formData: FormData): Promise<ActionState> => {

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const deadline = formData.get('deadline') as string
  const bounty = formData.get('bounty')

  const {user} = await getAuth()
  if (!user) return fromErrorToState(new Error('No auth'), formData)
  const ticket = await getTicket(id)
  if (!ticket) return fromErrorToState(new Error('No ticket'), formData)

  
  if (!isOwner({user, entity: ticket})) return fromErrorToState(new Error('Not owner!'), formData)
  

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