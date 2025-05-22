'use client'

import React, {useActionState} from 'react';
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {updateTicket} from "@/features/ticket/server-actions";
import {Ticket} from "@prisma/client";
import SubmitButton from "@/components/form/SubmitButton";
import ErrorMessage from "@/components/form/error-message";
import {EMPTY_STATE} from "@/utils/formUtils";
import Form from "@/components/form/form";

const TicketUpdateForm = ({ticket}: { ticket: Ticket }) => {
  const [formState, action] = useActionState(updateTicket.bind(null, ticket.id), EMPTY_STATE)  
  return (
    <Form action={action} actionState={formState}>
      <Label htmlFor="title"/>
      <Input defaultValue={formState.payload?.get('title') as string ?? ticket.title} type="text" id="title"
             name="title"/>
      <ErrorMessage formState={formState} name="title"/>
      <Label htmlFor="content"/>
      <Textarea defaultValue={formState.payload?.get('content') as string ?? ticket.content} id="content" name="content"
                className="mb-2"/>
      <ErrorMessage formState={formState} name="content"/>
      <SubmitButton label="Update"/>
    </Form>
  );
};

export default TicketUpdateForm;