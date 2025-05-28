import {useEffect, useRef} from 'react';
import {ActionState} from "@/utils/formUtils";

type FeedbackOptions = {
  onSuccess?: ({actionState}: {actionState: ActionState}) => void,
  onError?: ({actionState}: {actionState: ActionState}) => void,
}

const useFormFeedback = (formState: ActionState, options: FeedbackOptions) => {
  const prevTimestamp = useRef(formState.timestamp)
  const isUpdate = prevTimestamp.current !== formState.timestamp
  
  useEffect(() => {

    if (!isUpdate) return
    
    if (formState.status === 'SUCCESS') {
      options.onSuccess?.({actionState: formState})
    }

    if (formState.status === 'ERROR') {
      options.onError?.({actionState: formState})
    }
    prevTimestamp.current = formState.timestamp
    
  }, [formState.status, formState.timestamp, options, formState, isUpdate])

}

export default useFormFeedback;