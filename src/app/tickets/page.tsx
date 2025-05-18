import Heading from "@/components/shared/Heading";
import {tickets} from "@/data";
import TicketItem from "@/features/ticket/components/TicketItem";

export default function Tickets() {
  return (
    <div className="w-full  m-auto mt-3">
      <Heading title="Tickets" text="All your tickets in one place"/>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in ">
        {
          tickets.map(ticket => <TicketItem key={ticket.id} ticket={ticket} />
          )
        }
      </ul>
    </div>
  )
}



