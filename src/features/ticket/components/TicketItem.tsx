import clsx from "clsx";
import {SquareArrowOutUpRight} from "lucide-react";
import Link from "next/link";
import React from 'react';
import {Button} from "@/components/ui/button";
import {TICKET_ICONS} from "@/features/ticket/constants";
import { Ticket } from "@prisma/client";


const TicketItem = ({ticket}: { ticket: Ticket }) => {
  return (
    <li className="flex gap-2 max-w-[420px]">
      <div className="p-4 shadow-lg border mb-2 border-slate-100 rounded flex-1 ">
        <div className="flex gap-2 items-center"><p>{TICKET_ICONS[ticket.status]}</p>
          <p className={clsx("text-muted-foreground", {"line-through": ticket.status === 'DONE'})}>
            {ticket.title}
          </p>
        </div>
        <p className="line-clamp-3 py-4">{ticket.content}</p>

      </div>
      <div>
        <Button variant="outline">
          <Link className="text-sm underline" href={`/tickets/${ticket.id}`}>
            <SquareArrowOutUpRight />
          </Link>
        </Button>
      </div>
    </li>
  );
};

export default TicketItem;