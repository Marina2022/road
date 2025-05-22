import React from 'react';
import {ActionState} from "@/utils/formUtils";

type ErrorMessageProps = {
  formState?: ActionState;
  name: string;
}

const ErrorMessage = ({formState, name}: ErrorMessageProps) => {
  
  const message = formState?.fieldErrors?.[name]?.[0]

  console.log('message = ', message)

  return (
      <p className="text-red-500">{message} </p>    
  );
};

export default ErrorMessage;