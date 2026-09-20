"use server";

import { FormSchema } from "@/lib/contact-schema";
import { send } from "@/lib/nodemailer";

// `unknown`, not FormSchemaType: a server action is a public endpoint, and
// the caller is not necessarily our form. The zodResolver in Contact.tsx runs
// in the browser only, so before this change anything that could POST here
// reached nodemailer unvalidated.
export async function sendEmail(values: unknown) {
  const parsed = FormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      accepted: false,
    };
  }

  try {
    // parsed.data, not values: the schema trims the body and this keeps the
    // payload to exactly the five known fields.
    await send(parsed.data);

    return {
      accepted: true,
    };
  } catch {
    // Unconditional: the previous `error instanceof Error` guard fell through
    // and returned undefined for anything else thrown.
    return {
      accepted: false,
    };
  }
}
