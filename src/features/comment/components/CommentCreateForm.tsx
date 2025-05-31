'use client'

import React, {useActionState} from 'react';
import {createComment} from "@/features/comment/commentActions";
import {Textarea} from "@/components/ui/textarea";
import SubmitButton from "@/components/form/SubmitButton";
import Form from "@/components/form/form";
import {EMPTY_STATE} from "@/utils/formUtils";
import ErrorMessage from '@/components/form/error-message';


type CommentCreateFormProps = {
  ticketId: number;
}

const CommentCreateForm = ({ticketId}: CommentCreateFormProps) => {

  const [actionState, action] = useActionState(createComment.bind(null, ticketId), EMPTY_STATE)

  return (
    <Form action={action} actionState={actionState}>
      <Textarea
        name="content"
        placeholder="What's on your mind?"
      />
      <ErrorMessage name="content" formState={actionState} />
      <SubmitButton label="Comment" className="mt-5"/>
    </Form>
  );
};

export default CommentCreateForm;