'use client'

import React, {useActionState} from 'react';
import {EMPTY_STATE} from "@/utils/formUtils";
import Form from "@/components/form/form";
import {Input} from "@/components/ui/input";
import ErrorMessage from "@/components/form/error-message";
import SubmitButton from "@/components/form/SubmitButton";
import {ACCEPTED} from "@/features/ticket/constants";
import {Entity} from "@prisma/client";
import {createAttachment} from "@/features/attachments/attachmentsActions";

const AttachmentCreateForm = ({entityId, entity}: {entityId: number | string, entity: Entity}) => {

  const [formState, action] = useActionState(createAttachment.bind(null, {entityId, entity}), EMPTY_STATE)
  
  return (
    <Form action={action} actionState={formState}  >
      <Input id="files" name="files" type="file" multiple accept={ACCEPTED.join(',')} />
      <ErrorMessage formState={formState} name="files"/>      
      <SubmitButton className="mt-2" label="Upload"/>
    </Form>
  );
};

export default AttachmentCreateForm;