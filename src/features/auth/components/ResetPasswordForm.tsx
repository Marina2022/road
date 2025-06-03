'use client'

import React, {useActionState} from 'react';
import {Input} from "@/components/ui/input";
import SubmitButton from "@/components/form/SubmitButton";
import {EMPTY_STATE} from "@/utils/formUtils";
import Form from "@/components/form/form";
import ErrorMessage from "@/components/form/error-message";
import {passwordReset} from "@/features/auth/authActions";

const ResetPasswordForm = ({tokenId}:{tokenId: string}) => {
   
  const [actionState, action] = useActionState(passwordReset.bind(null, tokenId), EMPTY_STATE)

  return (
    <Form action={action} actionState={actionState}>

      <Input placeholder="password" name="password"  />
      <ErrorMessage formState={actionState} name="password"/>

      <Input placeholder="confirm password" name="confirmPassword"  />
      <ErrorMessage formState={actionState} name="confirmPassword"/>

      <SubmitButton label="Reset Password" />
    </Form>
  );
};


export default ResetPasswordForm;