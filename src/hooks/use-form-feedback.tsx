import {useEffect} from 'react';
import {ActionState} from "@/utils/formUtils";

type FeedbackOptions = {
  onSuccess?: ({actionState}: {actionState: ActionState}) => void,
  onError?: ({actionState}: {actionState: ActionState}) => void,
}

const useFormFeedback = (formState: ActionState, options: FeedbackOptions) => {

  useEffect(() => {
    if (formState.status === 'SUCCESS') {
      options.onSuccess?.({actionState: formState})
    } else {
      options.onError?.({actionState: formState})
    }
  }, [formState.status, options, formState])

}

export default useFormFeedback;