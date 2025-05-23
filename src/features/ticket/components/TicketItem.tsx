import clsx from "clsx";
import {Pencil, SquareArrowOutUpRight, X} from "lucide-react";
import Link from "next/link";
import React from 'react';
import {Button} from "@/components/ui/button";
import {TICKET_ICONS} from "@/features/ticket/constants";
import {Ticket} from "@prisma/client";
import {deleteTicket} from "@/features/ticket/server-actions";
import {fromCentsToDollars} from "@/utils/currency";


const TicketItem = ({ticket, editing = false}: { ticket: Ticket, editing?: boolean }) => {

  const goBtn = <Button variant="outline" asChild>
    <Link prefetch className="text-sm underline" href={`/tickets/${ticket.id}`}>
      <SquareArrowOutUpRight/>
    </Link>
  </Button>

  const deleteBtn = <form action={deleteTicket.bind(null, Number(ticket.id))}>
    <Button variant="outline">
      <X/>
    </Button>
  </form>

  const editBtn = <Button variant="outline" asChild>
    <Link prefetch className="text-sm underline" href={`/tickets/${ticket.id}/edit`}>
      <Pencil/>
    </Link>
  </Button>

  return (
    <li className={clsx("flex gap-2", {
      "max-w-[620px] mx-auto": editing,
      "max-w-[420px]": !editing,
    })}>
      <div className="p-4 shadow-lg border mb-2 border-slate-100 rounded flex-1 ">
        <div className="flex gap-2 items-center"><p>{TICKET_ICONS[ticket.status]}</p>
          <p className={clsx("text-muted-foreground", {"line-through": ticket.status === 'DONE'})}>
            {ticket.title}
          </p>
        </div>
        <p className="line-clamp-3 py-4">{ticket.content}</p>
        <div className="flex gap-4 justify-between">
          <div className="text-gray-400">{ticket.deadline}</div>
          <div className="font-bold">{fromCentsToDollars(ticket.bounty)}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {
          editing ?
            <>
              {deleteBtn}
              {editBtn}
            </>
            :
            <>
              {goBtn}
              {editBtn}
            </>
        }
      </div>
    </li>
  );
};

export default TicketItem;