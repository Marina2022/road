import clsx from "clsx";
import {MoreVertical, Pencil, SquareArrowOutUpRight} from "lucide-react";
import Link from "next/link";
import React from 'react';
import {Button, buttonVariants} from "@/components/ui/button";
import {TICKET_ICONS} from "@/features/ticket/constants";
import {Prisma} from "@prisma/client";
import {fromCentsToDollars} from "@/utils/currency";
import TicketMoreMenu from "@/features/ticket/components/TicketMoreMenu";
import {DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {getAuth} from "@/features/auth/authActions";
import {isOwner} from "@/utils/authUtils";

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{ include: {user: {
        select: {
          username: true,
        }
      }} }>,
  editing?: boolean
}

const TicketItem = async({ticket, editing = false}: TicketItemProps) => {

  const {user} = await getAuth()
  const isUserOwner = isOwner(user, ticket)
  
    const goBtn = <Button variant="outline" asChild>
      <Link prefetch className="text-sm underline" href={`/tickets/${ticket.id}`}>
        <SquareArrowOutUpRight/>
      </Link>
    </Button>

    const editBtn = isUserOwner ? <Button variant="outline" asChild>
      <Link prefetch className="text-sm underline" href={`/tickets/${ticket.id}/edit`}>
        <Pencil/>
      </Link>
    </Button> : null

    const moreMenu = isUserOwner ? <TicketMoreMenu
      ticket={ticket}
      trigger={
        <DropdownMenuTrigger>
          <div className={buttonVariants({
            variant: "outline"
          })}>
            <MoreVertical/>
          </div>
        </DropdownMenuTrigger>
      }
    /> : null

    return (
      <>
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
              <div className="flex gap-2">
                
                <div className="text-gray-400">{ticket.deadline} by {ticket.user?.username}</div>
              </div>
              <div className="font-bold">{fromCentsToDollars(ticket.bounty)}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {
              editing ?
                <>                  
                  {editBtn}
                  {moreMenu}
                </>
                :
                <>
                  {goBtn}
                  {editBtn}
                  {moreMenu}
                </>
            }
          </div>
        </li>
        {/*{dialog}*/}
      </>
    );
  }
;

export default TicketItem;