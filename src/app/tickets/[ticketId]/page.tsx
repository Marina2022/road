import React from 'react';
import TicketItem from "@/features/ticket/components/TicketItem";
import {getTicket} from "@/features/ticket/server-actions";


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

      <TicketItem ticket={ticket} />
    </div>
  );
};

export default Page;