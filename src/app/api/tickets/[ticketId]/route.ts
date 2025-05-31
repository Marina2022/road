import { getTicket } from "@/features/ticket/ticketActions";

export const GET = async (
  _request: Request,
  {params}: {
    params: Promise<{ ticketId: string }
    >
  }
) => {
  const haha = await params  
  const ticket = await getTicket(Number(haha.ticketId))
  return Response.json(ticket);
}