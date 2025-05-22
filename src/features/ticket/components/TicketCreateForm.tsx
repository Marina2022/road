'use client'
import React, {useActionState} from 'react';
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {createTicket} from "@/features/ticket/server-actions";
import SubmitButton from "@/components/form/SubmitButton";
import {EMPTY_STATE} from "@/utils/formUtils";
import Form from "@/components/form/form";

const TicketCreateForm = () => {

  const [formState, action] = useActionState(createTicket, EMPTY_STATE)
  
  return (
    <Form action={action} actionState={formState}>
      <Label htmlFor="title"/>
      <Input type="text" id="title" name="title"/>

      <Label htmlFor="content"/>
      <Textarea id="content" name="content" className="mb-2"/>
      <SubmitButton label="Create"/>
    </Form>
  );
};

export default TicketCreateForm;