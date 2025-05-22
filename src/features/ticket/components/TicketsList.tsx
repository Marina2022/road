import React from 'react';
import TicketItem from "@/features/ticket/components/TicketItem";
import {getTickets} from "@/features/ticket/server-actions";

const TicketsList = async() => {

  const tickets = await getTickets();
  
  if (!tickets) return null
  
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 animate-fade-in ">
      {
        tickets.map(ticket => <TicketItem key={ticket.id} ticket={ticket}/>
        )
      }
    </ul>
  );
};

export default TicketsList;