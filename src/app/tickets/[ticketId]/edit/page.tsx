import React from 'react';
import CardCompact from "@/components/shared/Card-compact";
import {notFound} from "next/navigation";
import {getTicket} from "@/features/ticket/server-actions";
import TicketUpdateForm from "@/features/ticket/components/TicketUpdateForm";

type PageProps = {
  params: Promise<{
    ticketId: string
  }>
}

const Page = async({params}:PageProps) => {
  
  const {ticketId} = await params
  
  const ticket = await getTicket(Number(ticketId))
  
  if (!ticket) {
    notFound()
  }
  
  return (
    <div>
      <CardCompact className="max-w-[520px] mx-auto mb-10"
                   title="Edit a Ticket"
                   description="Edit a Ticket"
                   content={<TicketUpdateForm ticket={ticket} />}/>
    </div>
  );
};

export default Page;