import Heading from "@/components/shared/Heading";
import TicketsList from "@/features/ticket/components/TicketsList";


export default function Home() {


  return (
    <div className="flex flex-col items-center justify-center ">
      <Heading title="All Tickets" text="Tickets by everyone in one place"/>
      
      <TicketsList ownTickets={false} />
    </div>
  )
}



