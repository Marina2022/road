import React from 'react';
import {tickets} from "@/data";


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
      <h1 className="text-2xl">Ticket {ticketId}</h1>
      <p>{ticket.content}</p>      
    </div>
  );
};

export default Page;