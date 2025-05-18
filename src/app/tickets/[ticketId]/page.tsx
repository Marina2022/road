import React from 'react';
import {tickets} from "@/data";
import TicketItem from "@/features/ticket/components/TicketItem";


interface TicketPageProps {
  params: Promise<{
    ticketId: string
  }>
}

const Page = async ({params}: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = tickets.find(ticket => ticket.id === ticketId)
  
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