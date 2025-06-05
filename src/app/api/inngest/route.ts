import {serve} from "inngest/next";
import {inngest} from "@/lib/inngest";
import {passwordResetEvent} from "@/features/auth/events/event-password-reset";
import {EmailVerificationEvent} from "@/features/auth/events/email-verification";

export const {GET, POST, PUT} = serve({
  client: inngest, 
  functions: [passwordResetEvent, EmailVerificationEvent]  // todo register functions
})