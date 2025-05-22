import React, {useMemo} from 'react';
import {toast} from "sonner";
import useFormFeedback from "@/hooks/use-form-feedback";
import {ActionState} from "@/utils/formUtils";

type FormProps = {
  action: (FormData)=>void,
  children: React.ReactNode,
  actionState: ActionState  
}

const Form = ({action, actionState, children}:FormProps ) => {

  const options = useMemo(() => ({
    onSuccess: ({actionState}) => {
      toast.success(actionState.message)
    },
    onError: ({actionState}) => {
      if (actionState.message) toast.error(actionState.message)
    },
  }), [])

  useFormFeedback(actionState, options)
  
  return (
    <form action={action} className="flex flex-col gap-2">
      {children}
    </form>
  );
};

export default Form;