import React from 'react';
import TicketItem from "@/features/ticket/components/TicketItem";
import {getTicket, getTickets} from "@/features/ticket/ticketActions";
import {getAuthOrRedirect} from '@/utils/authUtils';
import {notFound} from "next/navigation";
import RedirectToaster from "@/components/shared/RedirectToaster";


interface TicketPageProps {
  params: Promise<{
    ticketId: string
  }>
}

const Page = async ({params}: TicketPageProps) => {

   
  await getAuthOrRedirect()

  const {ticketId} = await params;
  const ticket = await getTicket(Number(ticketId))

  if (!ticket) {
    notFound()
  }

  return (
    <>
      <div className="w-4/5 m-auto mt-3">
        <TicketItem ticket={ticket} editing={true}/>
      </div>
      <RedirectToaster/>
    </>
  )
}

export async function generateStaticParams() {
  const tickets = await getTickets();

  if (!tickets) return []

  return tickets.map(ticket => ({ticketId: ticket.id.toString()}))
}


export default Page;