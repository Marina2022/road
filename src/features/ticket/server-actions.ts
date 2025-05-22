'use server'

import {prisma} from "@/lib/prismaClient";
import {revalidatePath} from "next/cache";
import {Ticket} from "@prisma/client";
import {cache} from "react";
import {redirect} from "next/navigation";
import {z} from "zod";
import {ActionState, fromErrorToState} from "@/utils/formUtils";

export const getTickets = async (): Promise<Ticket[] | null> => {
  try {
    return await prisma.ticket.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    })
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getTicket = cache(async (id: number): Promise<Ticket | null> => {
  try {
    return await prisma.ticket.findFirst(
      {
        where: {
          id: id
        }
      }
    )
  } catch (err) {
    console.log(err)
    return null
  }
})

export const deleteTicket = async (id: number): Promise<void> => {
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
  }
}

export const createTicket = async (formData: FormData): Promise<void> => {

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title || !content) throw new Error('Missing title or content')

  try {
    await prisma.ticket.create(
      {
        data: {
          title, content
        }
      }
    )
    revalidatePath('/tickets')

  } catch (err) {
    console.log(err)
  }
}

export const updateTicket = async (id: number, state: ActionState, formData: FormData): Promise<ActionState> => {

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const updateTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1).max(1024)
  })

  try {
    const data = updateTicketSchema.parse({title, content})

    await prisma.ticket.update(
      {
        data,
        where: {id}
      }
    )
    revalidatePath('/tickets')

  } catch (err) {
    console.log(err)
    return fromErrorToState(err, formData)
  }

  redirect('/tickets')
}