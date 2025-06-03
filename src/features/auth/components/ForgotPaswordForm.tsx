'use client'

import React, {useActionState} from 'react';
import {Input} from "@/components/ui/input";
import SubmitButton from "@/components/form/SubmitButton";
import {EMPTY_STATE} from "@/utils/formUtils";
import Form from "@/components/form/form";
import ErrorMessage from "@/components/form/error-message";
import {passwordForgot} from "@/features/auth/authActions";

const ForgotPasswordForm = () => {

  const [actionState, action] = useActionState(passwordForgot, EMPTY_STATE)

  return (
    <Form action={action}  actionState={actionState}>

      <Input placeholder="email" name="email" defaultValue={actionState.payload?.get('email') as string} />
      <ErrorMessage formState={actionState} name="email"/>
      
      <SubmitButton label="Send Email" />
    </Form>
  );
};


export default ForgotPasswordForm;