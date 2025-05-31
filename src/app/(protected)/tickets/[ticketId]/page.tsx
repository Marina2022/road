import React from 'react';
import TicketItem from "@/features/ticket/components/TicketItem";
import {getTicket} from "@/features/ticket/ticketActions";
import {notFound} from "next/navigation";
import RedirectToaster from "@/components/shared/RedirectToaster";
import BreadCrumbs from "@/components/shared/BreadCrumbs";

interface TicketPageProps {
  params: Promise<{
    ticketId: string
  }>
}

const Page = async ({params}: TicketPageProps) => {

  const {ticketId} = await params;
  const ticket = await getTicket(Number(ticketId))

  if (!ticket) {
    notFound()
  }

  const breadcrumbs = [
    {title: 'Home', href: '/'},
    {title: 'All Tickets', href: '/tickets'},
    {title: ticket.title}
  ]

  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs}/>
      <div className="w-4/5 m-auto mt-3">
        <TicketItem ticket={ticket} isDetailed={true}/>
      </div>              
      <RedirectToaster/>
    </>
  )
}

//
// export async function generateStaticParams() {
//   const tickets = await getTickets();
//
//   if (!tickets) return []
//
//   return tickets.map(ticket => ({ticketId: ticket.id.toString()}))
// }


export default Page;