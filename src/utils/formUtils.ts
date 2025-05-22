import {typeToFlattenedError, ZodError} from "zod"

export type ActionState = { message: string, payload?: FormData, fieldErrors?: Record<string, string[] | undefined> }


export const fromErrorToState = (error: unknown, formData: FormData): {
  message: string;
  payload: FormData;
  fieldErrors?: Record<string, string[] | undefined>
} => {

  if (error instanceof ZodError) {
    return {message: error.issues[0].message, payload: formData, fieldErrors: error.flatten().fieldErrors}
  } else if (error instanceof Error) {
    return {message: error.message, payload: formData, fieldErrors: {}}
  } else {
    return {message: 'Something went wrong', payload: formData, fieldErrors: {}}
  }
}