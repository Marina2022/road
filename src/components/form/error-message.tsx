import React from 'react';
import {ActionState} from "@/utils/formUtils";

type ErrorMessageProps = {
  formState?: ActionState;
  name: string;
}

const ErrorMessage = ({formState, name}: ErrorMessageProps) => {
  
  const message = formState?.fieldErrors?.[name]?.[0]
  
  return (
      <p className="text-red-500 text-sm -mt-2">{message} </p>    
  );
};

export default ErrorMessage;