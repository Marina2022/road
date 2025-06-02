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
import SubmitButton from "@/components/form/SubmitButton";
import {ActionState} from "@/utils/formUtils";
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";


type UseConfirmDialogProps = {
  trigger: React.ReactElement<{ onClick?: () => void }>,
  action: (formData?: FormData) => void,
  title?: string,
  description?: string,
  actionState: ActionState,
  onSuccess: (actionState: ActionState) => void
}

const useConfirmDialog = ({
                            onSuccess,
                            action,
                            actionState,
                            trigger,
                            title = "Are you sure?",
                            description = "This action cannot be undone."
                          }: UseConfirmDialogProps) => {

  const [open, setOpen] = useState(false)
  const router = useRouter();
  const pathname = usePathname();

  const dialogTrigger = cloneElement(trigger,
    {
      onClick: () => {
        setOpen(true)
      }
    })

  const handleError = () => {
    if (pathname !== '/tickets') {
      router.push('/tickets')
    } else {
      setOpen(false)
    }
  }

  const handleSuccess = () => {
    setOpen(false)
    onSuccess?.(actionState)
  }

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
          <Form action={action} actionState={actionState} onError={handleError} onSuccess={handleSuccess}>
            <SubmitButton label="Confirm"/>
          </Form>
        </AlertDialogAction>

        {/*<div>*/}
        {/*  <form action={action}>*/}
        {/*    <SubmitButton label="Confirm"/>*/}
        {/*  </form>*/}
        {/*</div>*/}
        
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  return ({dialogTrigger, dialog})
}

export default useConfirmDialog;