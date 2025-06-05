'use client'

import React, {useActionState} from 'react';
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/SubmitButton";
import {EMPTY_STATE} from "@/utils/formUtils";
import { emailVerificationResend } from '../authActions';

const EmailVerificationResendForm = () => {

  const [actionState, action] = useActionState(emailVerificationResend, EMPTY_STATE)

  return (
    <Form action={action}  actionState={actionState}>
      <SubmitButton label="Resend Code" variant="ghost" />
    </Form>
  );
};

export default EmailVerificationResendForm;