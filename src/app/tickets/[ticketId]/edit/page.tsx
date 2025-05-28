import React from 'react';
import CardCompact from "@/components/shared/Card-compact";
import {notFound} from "next/navigation";
import {getTicket} from "@/features/ticket/ticketActions";
import TicketUpdateForm from "@/features/ticket/components/TicketUpdateForm";
import {getAuth} from "@/features/auth/authActions";
import {getAuthOrRedirect, isOwner} from "@/utils/authUtils";

type PageProps = {
  params: Promise<{
    ticketId: string
  }>
}

const Page = async({params}:PageProps) => {

  await getAuthOrRedirect()
  
  const {user} = await getAuth()

  const {ticketId} = await params;
  const ticket = await getTicket(Number(ticketId))

  if (!isOwner(user, ticket) || !ticket) {
    notFound()
  }
  
  
  return (
    <div className="h-full w-full flex items-center justify-center flex-1">
      <CardCompact className="max-w-[520px] mx-auto mb-10"
                   title="Edit a Ticket"
                   description="Edit a Ticket"
                   content={<TicketUpdateForm ticket={ticket}                                              
                   />}/>
    </div>
  );
};

export default Page;