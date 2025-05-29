import React from 'react';
import TicketItem from "@/features/ticket/components/TicketItem";
import {getTickets} from "@/features/ticket/ticketActions";
import SearchInput from "@/features/ticket/components/SearchInput";

const TicketsList = async ({userId, search}: { userId?: string, search?: string }) => {

  const tickets = await getTickets({userId, search});

  if (!tickets) return null

  return (    
    <>
      <SearchInput placeholder="Search tickets..." />
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 animate-fade-in ">
        {
          tickets.map(ticket => <TicketItem key={ticket.id} ticket={ticket}/>
          )
        }
      </ul>
      {
        tickets.length === 0 && <div>No tickets found.</div>
      }
    </>
  );
};

export default TicketsList;