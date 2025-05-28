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


type UseConfirmDialogProps = {
  trigger: React.ReactElement<{ onClick?: () => void }>,
  action: () => void,
  title?: string,
  description?: string,
  actionState: ActionState
}

const useConfirmDialog = ({
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
      onClick: () => setOpen(true)
    })

  const handleError = () => {
    if (pathname !== '/tickets') {
      router.push('/tickets')
    } else {
      setOpen(false)
    }
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
          <Form action={action} actionState={actionState} onError={handleError}>
            <SubmitButton label="Confirm"/>
          </Form>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  return ({dialogTrigger, dialog})
}

export default useConfirmDialog;