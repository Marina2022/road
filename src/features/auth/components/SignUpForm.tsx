'use client'

import React, {useActionState} from 'react';
import {Input} from "@/components/ui/input";
import SubmitButton from "@/components/form/SubmitButton";
import {signUp} from "@/features/auth/authActions";
import {EMPTY_STATE} from "@/utils/formUtils";
import Form from "@/components/form/form";
import ErrorMessage from "@/components/form/error-message";

const SignUpForm = () => {
  
  const [actionState, action] = useActionState(signUp, EMPTY_STATE)
  
  return (
    <Form action={action}  actionState={actionState}>
      <Input placeholder="username" name="username" defaultValue={actionState.payload?.get('user') as string} />
      <ErrorMessage formState={actionState} name="username"/>
      
      <Input placeholder="email" name="email" defaultValue={actionState.payload?.get('email') as string} />
      <ErrorMessage formState={actionState} name="email"/>
      
      <Input placeholder="password" name="password" type="password"/>
      <ErrorMessage formState={actionState} name="password"/>
      
      <Input placeholder="confirmPassword" name="confirmPassword" type="password"/>
      <ErrorMessage formState={actionState} name="confirmPassword"/>
      
      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export default SignUpForm;