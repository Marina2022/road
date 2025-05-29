import Heading from "@/components/shared/Heading";
import TicketsList from "@/features/ticket/components/TicketsList";
import React, {Suspense} from "react";
import Loader from "@/components/shared/Loader";
import CardCompact from "@/components/shared/Card-compact";
import TicketCreateForm from "@/features/ticket/components/TicketCreateForm";
import RedirectToaster from "@/components/shared/RedirectToaster";
import {getAuth} from "@/features/auth/authActions";

type TicketsProps = {
  searchParams: Promise<{ search?: string }>
}

export default async function Tickets({searchParams}: TicketsProps) {
  
  const {user} = await getAuth()
  if (!user) return null
  
  const {search} = await searchParams
  
  return (
    <div className="flex flex-col items-center justify-center ">
      <Heading title="My Tickets" text="All your tickets in one place"/>

      <CardCompact className="max-w-[520px] mx-auto mb-10" 
                   title="Create a Ticket" 
                   description="Create a Ticket"
                   content={<TicketCreateForm/>}/>

      <Suspense fallback={<Loader/>}>
        <TicketsList userId={user.id} search={search} />
      </Suspense>
      <RedirectToaster/>
    </div>
  )
}



