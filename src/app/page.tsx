import Heading from "@/components/shared/Heading";
import TicketsList from "@/features/ticket/components/TicketsList";

type HomeProps = {
  searchParams: Promise<{ search?: string }>
}

export default async function Home({searchParams}: HomeProps) {
  const {search} = await searchParams

  return (
    <div className="flex flex-col items-center justify-center ">
      <Heading title="All Tickets" text="Tickets by everyone in one place"/>
      
      <TicketsList search={search} />
    </div>
  )
}



