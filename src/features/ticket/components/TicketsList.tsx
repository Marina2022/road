import React from 'react';
import TicketItem from "@/features/ticket/components/TicketItem";
import {getTickets} from "@/features/ticket/ticketActions";
import {ParsedSearchParams} from "@/features/ticket/search-params";
import TicketsSearchInput from "@/features/ticket/components/TicketsSearchInput";
import TicketsSort from "@/features/ticket/components/TicketsSort";
import TicketPagination from "@/features/ticket/components/TicketPagination";

type TicketListProps =
  {
    userId?: string,
    searchParams: Awaited<ParsedSearchParams>
    byOrganization?: boolean
  }


const TicketsList = async ({userId, searchParams, byOrganization}: TicketListProps) => {

  const ticketsData = await getTickets({userId, searchParams, byOrganization});
  const tickets = ticketsData?.list
  
  const options = [
    {
      label: "Closest deadline",
      sortKey: "deadline",
      sortValue: "desc",
    },
    {
      label: "bounty asc",
      sortKey: "bounty",
      sortValue: "asc",
    },
    {
      label: "Bounty",
      sortKey: "bounty",
      sortValue: "desc",
    }
  ]

  if (!tickets) return null
  if (tickets.length === 0) return <div>No tickets found.</div>

  return (
    <>
      <div className="flex gap-2 w-[520px] ">
        <TicketsSearchInput placeholder="Search tickets..."/>
        <TicketsSort options={options}/>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 animate-fade-in ">
        {
          tickets.map(ticket => <TicketItem key={ticket.id} ticket={ticket}/>
          )
        }
      </ul>
      <div className="mt-10 w-full">
        <TicketPagination count={ticketsData?.metadata.count} hasNext={ticketsData?.metadata.hasNext}/>
      </div>
    </>
  );
};

export default TicketsList;