import Heading from "@/components/shared/Heading";
import TicketsList from "@/features/ticket/components/TicketsList";
import {SearchParams} from "nuqs/server";
import {searchParamsCache} from "@/features/ticket/search-params";

type HomeProps = {
  searchParams: Promise<SearchParams>
}

export default async function Home({searchParams}: HomeProps) {
  
  return (
    <div className="flex flex-col items-center justify-center ">
      <Heading title="All Tickets" text="Tickets by everyone in one place"/>      
      <TicketsList searchParams={searchParamsCache.parse(await searchParams)}  />
    </div>
  )
}



