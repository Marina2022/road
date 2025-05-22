'use client'

import React, {useActionState} from 'react';
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {updateTicket} from "@/features/ticket/server-actions";
import {Ticket} from "@prisma/client";
import SubmitButton from "@/components/form/SubmitButton";

const TicketUpdateForm = ({ticket}: { ticket: Ticket }) => {
  
  const [formState, action] = useActionState(updateTicket.bind(null, ticket.id), {message: ''})

    
  return (
    <form action={action} className="flex flex-col gap-2">
      <Label htmlFor="title"/>
      <Input defaultValue={ formState.payload?.get('title') as string ?? ticket.title} type="text" id="title" name="title"/>
      {
        formState?.fieldErrors?.title?.[0] && <p className="text-red-500">{formState?.fieldErrors?.title[0]}</p>
      }

      <Label htmlFor="content"/>
      <Textarea defaultValue={ formState.payload?.get('content') as string ?? ticket.content} id="content" name="content" className="mb-2"/>
      <SubmitButton label="Update"/>

      {
        formState?.fieldErrors?.content?.[0] && <p className="text-red-500">{formState?.fieldErrors?.content?.[0]}</p>
      }
    </form>
  );
};

export default TicketUpdateForm;