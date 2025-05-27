'use client'

import React, {useActionState} from 'react';
import {Input} from "@/components/ui/input";
import SubmitButton from "@/components/form/SubmitButton";
import {EMPTY_STATE} from "@/utils/formUtils";
import Form from "@/components/form/form";
import ErrorMessage from "@/components/form/error-message";
import {signIn} from "@/features/auth/authActions";

const SignInForm = () => {

  const [actionState, action] = useActionState(signIn, EMPTY_STATE)

  return (
    <Form action={action}  actionState={actionState}>
      
      <Input placeholder="email" name="email" defaultValue={actionState.payload?.get('email') as string} />
      <ErrorMessage formState={actionState} name="email"/>

      <Input placeholder="password" name="password" type="password"/>
      <ErrorMessage formState={actionState} name="password"/>
      
      <SubmitButton label="Sign In" />
    </Form>
  );
};


export default SignInForm;