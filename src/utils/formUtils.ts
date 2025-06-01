import {ZodError} from "zod"

export type ActionState = {
  message: string,
  payload?: FormData,
  fieldErrors?: Record<string, string[] | undefined>
  timestamp: number,
  status?: 'SUCCESS' | 'ERROR',
  data?: unknown,
}

export const EMPTY_STATE: ActionState = {message: '', timestamp: Date.now()}

export const toActionState = (status: 'SUCCESS' | 'ERROR', message: string, data?: unknown) => {
  return {
    message,
    status,
    timestamp: Date.now(),
    data
  }
}


export const fromErrorToState = (error: unknown, formData: FormData): {
  message: string;
  payload: FormData;
  fieldErrors?: Record<string, string[] | undefined>;
  timestamp: number;
  status?: 'SUCCESS' | 'ERROR';
} => {

  if (error instanceof ZodError) {
    return {
      message: error.issues[0].message,
      payload: formData, fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
      status: 'ERROR'
    }
  } else if (error instanceof Error) {
    return {
      message: error.message,
      payload: formData,
      fieldErrors: {},
      timestamp: Date.now(),
      status: 'ERROR'
    }
  } else {
    return {
      message: 'Something went wrong',
      payload: formData,
      fieldErrors: {},
      timestamp: Date.now(),
      status: 'ERROR'
    }
  }
}