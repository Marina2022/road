'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import React, {useActionState, useState} from 'react';
import {EMPTY_STATE} from "@/utils/formUtils";
import {createInvitation} from '../organizationActions';
import {Button} from "@/components/ui/button";
import Form from "@/components/form/form";
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import ErrorMessage from "@/components/form/error-message";
import SubmitButton from '@/components/form/SubmitButton';

const InvitationCreateButton = ({organizationId}: { organizationId: string }) => {

  const [open, setOpen] = useState(false);

  const [actionState, action] = useActionState(createInvitation.bind(null, organizationId), EMPTY_STATE);

  const handleClose = () => {    
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
          <Button>Invite Member</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Member</DialogTitle>
            <DialogDescription>
              Invite a user by email to your organization
            </DialogDescription>
          </DialogHeader>

          <Form actionState={actionState} action={action} onSuccess={handleClose}>
            <div className="grid gap-4 py-4">
              <Label htmlFor="email">Email</Label>
              <Input name="email" id='email'></Input>
              <ErrorMessage name="email"  formState={actionState} />
            </div>
            <DialogFooter>
              <Button onClick={handleClose} type="button"  >
                Cancel
              </Button>
              <SubmitButton label="Invite"/>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvitationCreateButton;