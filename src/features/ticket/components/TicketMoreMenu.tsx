'use client'

import React, {useActionState, useState} from 'react';
import {X} from "lucide-react";
import {$Enums, Ticket} from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {TICKET_LABELS} from "@/features/ticket/constants";
import {deleteTicket, updateTicketStatus} from "@/features/ticket/ticketActions";
import {toast} from "sonner";
import useConfirmDialog from "@/hooks/useConfirmDialog";
import {Button} from "@/components/ui/button";
import {EMPTY_STATE} from "@/utils/formUtils";
import TicketStatus = $Enums.TicketStatus;

const TicketMoreMenu = ({ticket, trigger}: { ticket: Ticket, trigger: React.ReactNode }) => {

  const [position, setPosition] = useState(ticket.status)

  const handleValueChange = async (value: string) => {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus)
    toast.promise(promise, {loading: 'Updating ticket status...'})
    const result = await promise
    if (result === "ERROR") {
      toast.error("Error updating ticket status")
    } else if (result === "NOT YOURS") {
      toast.error("You have no right to edit this ticket")
    } else {
      setPosition(value as TicketStatus)
    }
  }

  const [actionState, action, isPending] = useActionState(deleteTicket.bind(null, Number(ticket.id)), EMPTY_STATE)

  const {dialogTrigger, dialog} = useConfirmDialog({
      isPending,
      trigger: <div className="cursor-pointer">
        <Button variant="outline"> <X/> </Button>
        <span className="ml-4">Delete</span>
      </div>,
      action,
      actionState
    }
  )

  return (
    <>
      <DropdownMenu>
        {trigger}
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={handleValueChange}
          >
            {
              (Object.keys(TICKET_LABELS) as Array<TicketStatus>).map((arrKey) => <DropdownMenuRadioItem
                key={arrKey}
                value={arrKey}
              >
                {TICKET_LABELS[arrKey]}
              </DropdownMenuRadioItem>)
            }
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
            {dialogTrigger}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {dialog}
    </>
  );
};

export default TicketMoreMenu;
