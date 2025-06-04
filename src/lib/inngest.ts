import {EventSchemas, Inngest} from 'inngest';
import {PasswordResetEventArgs} from "@/features/auth/events/event-password-reset";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs
}

export const inngest = new Inngest({
  id: "road",
  schemas: new EventSchemas().fromRecord<Events>(),
})