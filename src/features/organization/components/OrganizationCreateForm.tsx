'use client'
import Form from '@/components/form/form';
import React, { useActionState } from 'react';
import {Input} from "@/components/ui/input";
import ErrorMessage from "@/components/form/error-message";
import SubmitButton from "@/components/form/SubmitButton";
import {EMPTY_STATE} from "@/utils/formUtils";
import {createOrganization} from "@/features/organization/organizationActions";

const OrganizationCreateForm = () => {
  const [actionState, action] = useActionState(createOrganization, EMPTY_STATE)
  
  return (
    <Form action={action}  actionState={actionState}>

      <Input placeholder="Name" name="name" defaultValue={actionState.payload?.get('name') as string} />
      <ErrorMessage formState={actionState} name="name "/>

      <SubmitButton label="Create" />
    </Form>  
    
  );
};

export default OrganizationCreateForm;
