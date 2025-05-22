import {Button} from '@/components/ui/button';
import React from 'react';
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {createTicket} from "@/features/ticket/server-actions";
import SubmitButton from "@/components/form/SubmitButton";

const TicketCreateForm = () => {
  return (
    <form action={createTicket} className="flex flex-col gap-2">
      <Label htmlFor="title"/>
      <Input type="text" id="title" name="title"/>

      <Label htmlFor="content"/>
      <Textarea id="content" name="content" className="mb-2"/>
      <SubmitButton label="Create"/>
    </form>
  );
};

export default TicketCreateForm;