import React from 'react';
import TicketItem from "@/features/ticket/components/TicketItem";
import {getTicket, getTickets} from "@/features/ticket/server-actions";
import {getCookie} from "@/actions/cookies";
import RedirectToaster from "@/components/shared/RedirectToaster";


interface TicketPageProps {
  params: Promise<{
    ticketId: string
  }>
}

const Page = async ({params}: TicketPageProps) => {
  
   
  const { ticketId } = await params;
  const ticket = await getTicket( Number(ticketId))
  
  if (!ticket) {
    return <div>Ticket not found</div>
  }
  
  return (
    <div className="w-4/5 m-auto mt-3" >
      {/*<RedirectToaster  />*/}
      <TicketItem ticket={ticket} editing={true} />
    </div>
  )
}

export async function generateStaticParams() {
  const tickets = await getTickets();
  
  if (!tickets) return []

  return tickets.map(ticket => ({ticketId: ticket.id.toString()}))
}


export default Page;