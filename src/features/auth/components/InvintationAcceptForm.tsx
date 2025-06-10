'use client'

import React, { useActionState } from 'react';
import {EMPTY_STATE} from "@/utils/formUtils";
import Form from '@/components/form/form';
import SubmitButton from "@/components/form/SubmitButton";
import {acceptInvitation} from "@/features/organization/organizationActions";

const InvintationAcceptForm = ({tokenId}:{tokenId: string}) => {
  
  const [actionState, action] = useActionState(acceptInvitation.bind(null, tokenId), EMPTY_STATE)
  
  return (
    <Form action={action} actionState={actionState}> 
      <SubmitButton label="Accept" />
    </Form>
  );
};

export default InvintationAcceptForm;