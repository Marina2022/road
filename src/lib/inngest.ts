import {EventSchemas, Inngest} from 'inngest';
import {PasswordResetEventArgs} from "@/features/auth/events/event-password-reset";
import {EmailVerificationEventArgs} from "@/features/auth/events/email-verification";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs,
  "app/email.verification": EmailVerificationEventArgs
}

export const inngest = new Inngest({
  id: "road",
  schemas: new EventSchemas().fromRecord<Events>(),
})