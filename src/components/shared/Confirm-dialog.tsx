'use client'

import React, {cloneElement, useState} from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import Form from "@/components/form/form";
import {EMPTY_STATE} from "@/utils/formUtils";
import SubmitButton from "@/components/form/SubmitButton";


type UseConfirmDialogProps = {
  trigger: React.ReactElement<{ onClick?: () => void }>,
  action: () => Promise<void | { message: string }>,
  title?: string,
  description?: string,
}

const useConfirmDialog = ({
                            action,
                            trigger,
                            title = "Are you sure?",
                            description = "This action cannot be undone."
                          }: UseConfirmDialogProps) => {

  const [open, setOpen] = useState(false)

  const dialogTrigger = cloneElement(trigger, 
    {
      onClick: ()=>  setOpen(true)
    })         

  const dialog = <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>
          {description}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Form action={action} actionState={EMPTY_STATE}>
            <SubmitButton label="Confirm"/>
          </Form>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  return ({dialogTrigger, dialog})
}

export default useConfirmDialog;