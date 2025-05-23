'use client'

import React, {useActionState, useRef} from 'react';
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {createTicket} from "@/features/ticket/server-actions";
import SubmitButton from "@/components/form/SubmitButton";
import {EMPTY_STATE} from "@/utils/formUtils";
import Form from "@/components/form/form";
import ErrorMessage from "@/components/form/error-message";
import DatePicker from "@/components/shared/Date-picker";

const TicketCreateForm = () => {

  const [formState, action] = useActionState(createTicket, EMPTY_STATE)

  const imperativeHandleRef = useRef<{reset: ()=>void}>(null)
  
  const handleSuccess = ()=>{
    imperativeHandleRef.current?.reset()
  }
  
  return (
    <Form action={action} actionState={formState} onSuccess={handleSuccess} >
      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title"/>
      <ErrorMessage formState={formState} name="title"/>

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" className="mb-2"/>
      <ErrorMessage formState={formState} name="content"/>

      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline" className="mb-2 -mt-2">Deadline</Label>
          <DatePicker 
            name="deadline" 
            id="deadline"
            imperativeHandleRef={imperativeHandleRef}
            // key={formState.timestamp}
          />
          <ErrorMessage formState={formState} name="deadline"/>
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty" className="mb-2 -mt-2">Bounty ($)</Label>
          <Input type="number" step=".01" id="bounty" name="bounty"/>
          <ErrorMessage formState={formState} name="bounty"/>
        </div>
      </div>
      <SubmitButton className="mt-2" label="Create"/>
    </Form>
  );
};

export default TicketCreateForm;