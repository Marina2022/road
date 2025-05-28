import Heading from "@/components/shared/Heading";
import TicketsList from "@/features/ticket/components/TicketsList";
import React, {Suspense} from "react";
import Loader from "@/components/shared/Loader";
import CardCompact from "@/components/shared/Card-compact";
import TicketCreateForm from "@/features/ticket/components/TicketCreateForm";
import RedirectToaster from "@/components/shared/RedirectToaster";
import {getAuthOrRedirect} from "@/utils/authUtils";

export default async function Tickets() {

  await getAuthOrRedirect()
  
  return (
    <div className="flex flex-col items-center justify-center ">
      <Heading title="My Tickets" text="All your tickets in one place"/>

      <CardCompact className="max-w-[520px] mx-auto mb-10" 
                   title="Create a Ticket" 
                   description="Create a Ticket"
                   content={<TicketCreateForm/>}/>

      <Suspense fallback={<Loader/>}>
        <TicketsList ownTickets={true}/>
      </Suspense>
      <RedirectToaster/>
    </div>
  )
}



