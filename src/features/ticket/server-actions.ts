 'use server'


 import {prisma} from "@/lib/prismaClient";
import {revalidatePath} from "next/cache";
 import {Ticket} from "@prisma/client";

 // import {PrismaClient} from '@prisma/client';
 //
 // const prisma = new PrismaClient();
 

export const getTickets = async ():Promise<Ticket[] | null> => {
  try {
    return  await prisma.ticket.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    })
  } catch (err) {
    console.log(err)
    return null
  }
}


export const getTicket = async (id: number):Promise<Ticket | null> => {
  try {
    return  await prisma.ticket.findFirst(
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
}


export const deleteTicket = async (id: number):Promise<void> => {
  try {
    await prisma.ticket.delete(
      {
        where: {
          id: id
        }
      }
    ) 
    revalidatePath('/tickets')
      revalidatePath(`/tickets${id}`)
  } catch (err) {
    console.log(err)    
  }
}