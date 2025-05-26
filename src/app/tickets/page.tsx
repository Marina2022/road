import Heading from "@/components/shared/Heading";
import TicketsList from "@/features/ticket/components/TicketsList";
import React, {Suspense} from "react";
import Loader from "@/components/shared/Loader";
import CardCompact from "@/components/shared/Card-compact";
import TicketCreateForm from "@/features/ticket/components/TicketCreateForm";
import {getBaseUrl} from "@/utils/testEnv";

export default function Tickets() {

  console.log(getBaseUrl())
  
  return (
    <div className="w-full  m-auto mt-3">
      <Heading title="Tickets" text="All your tickets in one place"/>

      <CardCompact className="max-w-[520px] mx-auto mb-10" 
                   title="Create a Ticket" 
                   description="Create a Ticket"
                   content={<TicketCreateForm/>}/>

      <Suspense fallback={<Loader/>}>
        <TicketsList/>
      </Suspense>
    </div>
  )
}



