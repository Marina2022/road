'use client'

import React, {useActionState} from 'react';
import Form from "@/components/form/form";
import {Input} from "@/components/ui/input";
import ErrorMessage from "@/components/form/error-message";
import SubmitButton from "@/components/form/SubmitButton";
import {emailVerification} from "@/features/auth/authActions";
import {EMPTY_STATE} from "@/utils/formUtils";

const EmailVerificationForm = () => {

  const [actionState, action] = useActionState(emailVerification, EMPTY_STATE)
  
  return (
    <Form action={action}  actionState={actionState}>

      <Input placeholder="Code" name="code" defaultValue={actionState.payload?.get('email') as string} />
      <ErrorMessage formState={actionState} name="code "/>

      <SubmitButton label="Verify Email" />
    </Form>
  );
};

export default EmailVerificationForm;