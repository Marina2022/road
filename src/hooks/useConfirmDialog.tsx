'use client'

import React, {cloneElement, useEffect, useMemo, useRef, useState} from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {ActionState} from "@/utils/formUtils";
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import useFormFeedback from "@/hooks/use-form-feedback";
import Loader from "@/components/shared/Loader";


type UseConfirmDialogProps = {
  // trigger: React.ReactElement<{ onClick?: () => void }> | ((isPending: boolean) => React.ReactElement<{
  //   onClick?: () => void
  // }>),
  trigger: React.ReactElement<{ onClick?: () => void }>,
  action: (formData?: FormData) => void,
  title?: string,
  description?: string,
  actionState: ActionState,
  onSuccess?: (actionState: ActionState) => void,
  isPending: boolean
}

const useConfirmDialog = ({
                            onSuccess,
                            isPending,
                            action,
                            actionState,
                            trigger,
                            title = "Are you sure?",
                            description = "This action cannot be undone."
                          }: UseConfirmDialogProps) => {

  const [open, setOpen] = useState(false)
  const router = useRouter();
  const pathname = usePathname();

  // const dialogTrigger = cloneElement(
  //   typeof trigger === "function" ? trigger(isPending) : trigger,
  //   {
  //     onClick: () => {
  //       setOpen(true)
  //     }
  //   }
  // )


  const dialogTrigger = cloneElement(
    isPending ? <Button className="cursor-pointer"><Loader/></Button> : trigger,
    isPending ? {} :
      {
        onClick: () => {
          setOpen(true)
        }
      }
  )

  const toastId = useRef<number | string | null>(null);
  
  useEffect(() => {
    if (isPending) {
      toastId.current = toast.loading("Deleting....")
    } else {
      if (toastId.current) {
        toast.dismiss(toastId.current)
      }
    }

    return () => {
      if (toastId.current) {
        toast.dismiss(toastId.current)
      }
    }

  }, [isPending])

  const options = useMemo(() => ({
    onSuccess: ({actionState}: { actionState: ActionState }) => {
      toast.success(actionState.message)
      onSuccess?.(actionState)
      //setOpen(false)
    },
    onError: ({actionState}: { actionState: ActionState }) => {
      if (actionState.message) toast.error(actionState.message)
      if (pathname !== '/tickets') {
        router.push('/tickets')
      } else {
        setOpen(false)
      }
    },
  }), [router, pathname, onSuccess])

  useFormFeedback(actionState, options)

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

        {/*<AlertDialogAction asChild>*/}
        {/*  /!*<Form action={action} actionState={actionState} onError={handleError} onSuccess={handleSuccess}>*!/*/}
        {/*  /!*  <SubmitButton label="Confirm"/>*!/*/}
        {/*  /!*</Form>*!/                    */}
        {/*</AlertDialogAction>*/}

        <div>
          <form action={action}>
            <Button onClick={() => {
              setTimeout(() => setOpen(false), 0)

            }} type="submit">Confirm</Button>
          </form>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  return ({dialogTrigger, dialog})
}

export default useConfirmDialog;