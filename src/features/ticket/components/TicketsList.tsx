import React from 'react';
import TicketItem from "@/features/ticket/components/TicketItem";
import {getTickets} from "@/features/ticket/ticketActions";
import SearchInput from "@/features/ticket/components/SearchInput";
import SortTickets from "@/features/ticket/components/SortTickets";
import {ParsedSearchParams} from "@/features/ticket/search-params";

type TicketListProps =
  {
    userId?: string,
    searchParams: Awaited<ParsedSearchParams> 
  }
  
const TicketsList = async ({userId, searchParams}: TicketListProps) => {

  const tickets = await getTickets({userId, searchParams});

  if (!tickets) return null

  const options = [
    {
      label: "Closest deadline",
      value: "newest",
    },
    {
      label: "Bounty",
      value: "bounty",
    }
  ]

  return (
    <>
      <div className="flex gap-2 w-[520px] ">
        <SearchInput placeholder="Search tickets..."/>
        <SortTickets options={options}/>
      </div>
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