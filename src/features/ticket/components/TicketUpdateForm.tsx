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
import {fromCentsToDollarsNoMoneyFormat} from "@/utils/currency";

const TicketUpdateForm = ({ticket}: { ticket: Ticket }) => {
  const [formState, action] = useActionState(updateTicket.bind(null, ticket.id), EMPTY_STATE)  
  return (
    <Form action={action} actionState={formState}>
      <Label htmlFor="title">Title</Label>
      <Input defaultValue={formState.payload?.get('title') as string ?? ticket.title} type="text" id="title"
             name="title"/>
      <ErrorMessage formState={formState} name="title"/>
      
      <Label htmlFor="content">Content</Label>
      <Textarea defaultValue={formState.payload?.get('content') as string ?? ticket.content} id="content" name="content"
                className="mb-2"/>
      <ErrorMessage formState={formState} name="content"/>

      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline" className="mb-2 -mt-2">Deadline</Label>
          <Input type="date" id="deadline" name="deadline"/>
          <ErrorMessage formState={formState} name="deadline"/>
        </div>

        <div className="w-1/2">
          <Label htmlFor="bounty" className="mb-2 -mt-2">Bounty ($)</Label>
          <Input defaultValue={formState.payload?.get('bounty') as string ?? fromCentsToDollarsNoMoneyFormat(ticket.bounty)} type="number" step=".01" id="bounty" name="bounty"/>
          <ErrorMessage formState={formState} name="bounty"/>
        </div>
      </div>
      
      <SubmitButton label="Update" className="mt-2"/>
    </Form>
  );
};

export default TicketUpdateForm;