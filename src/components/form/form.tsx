import React, {useMemo} from 'react';
import {toast} from "sonner";
import useFormFeedback from "@/hooks/use-form-feedback";
import {ActionState} from "@/utils/formUtils";

type FormProps = {
  action: (formData: FormData)=>void,
  children: React.ReactNode,
  actionState: ActionState,
  onSuccess?: () => void,
  onError?: () => void, 
}

const Form = ({action, actionState, children, onSuccess, onError}:FormProps ) => {
  
  const options = useMemo(() => ({
    onSuccess: ({actionState}:{ actionState: ActionState }) => {
      toast.success(actionState.message)
      onSuccess?.()
    },
    onError: ({actionState}: { actionState: ActionState }) => {
      if (actionState.message) toast.error(actionState.message)
      onError?.()
    },
  }), [onError, onSuccess])

  useFormFeedback(actionState, options)
  
  return (
    <form action={action} className="flex flex-col gap-2">
      {children}
    </form>
  );
};

export default Form;