import {serve} from "inngest/next";
import {inngest} from "@/lib/inngest";
import {passwordResetEvent} from "@/features/auth/events/event-password-reset";

export const {GET, POST, PUT} = serve({
  client: inngest, 
  functions: [passwordResetEvent]  // todo register functions
})