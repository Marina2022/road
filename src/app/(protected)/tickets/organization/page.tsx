import Heading from "@/components/shared/Heading";
import TicketsList from "@/features/ticket/components/TicketsList";
import React, {Suspense} from "react";
import Loader from "@/components/shared/Loader";
import CardCompact from "@/components/shared/Card-compact";
import TicketCreateForm from "@/features/ticket/components/TicketCreateForm";
import RedirectToaster from "@/components/shared/RedirectToaster";
import {getAuth} from "@/features/auth/authActions";
import {SearchParams} from "nuqs/server";
import {searchParamsCache} from "@/features/ticket/search-params";

type TicketsProps = {
  searchParams: Promise<SearchParams>
}

export default async function Tickets({searchParams}: TicketsProps) {

  const {user} = await getAuth()
  if (!user) return null


  return (
    <div className="flex flex-col items-center justify-center ">
      <Heading title="My Tickets by my Active Organization" text="All your tickets in one place"/>

      <CardCompact className="max-w-[520px] mx-auto mb-10"
                   title="Create a Ticket"
                   description="Create a Ticket"
                   content={<TicketCreateForm/>}/>

      <Suspense fallback={<Loader/>}>
        <TicketsList
          byOrganization
          userId={user.id}
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
      <RedirectToaster/>
    </div>
  )
}



