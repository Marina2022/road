import React, {useActionState, useState} from 'react';
import {Entity} from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import Form from "@/components/form/form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import ErrorMessage from "@/components/form/error-message";
import SubmitButton from "@/components/form/SubmitButton";
import {EMPTY_STATE} from "@/utils/formUtils";
import {createAttachment} from "@/features/attachments/attachmentsActions";
import AttachmentCreateForm from "@/features/attachments/components/AttachmentCreateForm";

type AttachmentCreateButtonProps = {
  entity: Entity,
  entityId: string,
}

const AttachmentCreateButton = ({entity, entityId}: AttachmentCreateButtonProps) => {

  const [open, setOpen] = useState(false);

  // const [actionState, action] = useActionState(createAttachment.bind(null, {entity, entityId}), EMPTY_STATE);

  const handleClose = () => {
    setOpen(false);
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button>+</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>
            Upload files for a comment
          </DialogDescription>
        </DialogHeader>

        <AttachmentCreateForm entity={entity} entityId={entityId} />

        {/*<Form actionState={actionState} action={action} onSuccess={handleClose}>*/}
        {/*  <div className="grid gap-4 py-4">*/}
        {/*    <Label htmlFor="files">Upload files</Label>*/}
        {/*    <Input name="files" id='files' type="file"></Input>*/}
        {/*    <ErrorMessage name="files"  formState={actionState} />*/}
        {/*  </div>*/}
        {/*  <DialogFooter>*/}
        {/*    <Button onClick={handleClose} type="button"  >*/}
        {/*      Cancel*/}
        {/*    </Button>*/}
        {/*    <SubmitButton label="Upload"/>*/}
        {/*  </DialogFooter>*/}
        {/*</Form>*/}
      </DialogContent>
    </Dialog>
  );
};

export default AttachmentCreateButton;