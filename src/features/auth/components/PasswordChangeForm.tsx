'use client'

import React, {useActionState} from 'react';
import {Input} from "@/components/ui/input";
import SubmitButton from "@/components/form/SubmitButton";
import {EMPTY_STATE} from "@/utils/formUtils";
import Form from "@/components/form/form";
import ErrorMessage from "@/components/form/error-message";
import {passwordChange} from "@/features/auth/authActions";

const PasswordChangeForm = () => {

  const [actionState, action] = useActionState(passwordChange, EMPTY_STATE)

  return (
    <Form action={action}  actionState={actionState}>

      <Input placeholder="Password" name="password" defaultValue={actionState.payload?.get('email') as string} />
      <ErrorMessage formState={actionState} name="password"/>

      <SubmitButton label="Send Email" />
    </Form>
  );
};


export default PasswordChangeForm;