"use server";

import { headers } from "next/headers";
import { FormSchema } from "@/lib/contact-schema";
import { send } from "@/lib/nodemailer";
import { withinRateLimit } from "@/lib/rate-limit";

// Three messages per client per ten minutes. No human fills this form a
// fourth time in ten minutes; a script pointed at the action would otherwise
// keep sending until the SMTP quota ran out, since the recipient is fixed and
// every call lands in the same inbox.
const LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;

// x-forwarded-for is client-controlled unless a proxy in front of the app
// overwrites it, which is what Vercel and most reverse proxies do. Where
// nothing sets it, everyone shares the "unknown" bucket — that fails towards
// limiting too much rather than too little, which is the right direction for
// a contact form.
async function clientKey() {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();

  return forwarded || headerList.get("x-real-ip") || "unknown";
}

// `unknown`, not FormSchemaType: a server action is a public endpoint, and
// the caller is not necessarily our form. The zodResolver in Contact.tsx runs
// in the browser only, so before this change anything that could POST here
// reached nodemailer unvalidated.
export async function sendEmail(values: unknown) {
  // Parse before reading headers: validation is synchronous, so a flood of
  // malformed payloads is turned away without awaiting anything.
  const parsed = FormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      accepted: false,
    };
  }

  if (!withinRateLimit(`contact:${await clientKey()}`, LIMIT, WINDOW_MS)) {
    // Deliberately the same shape as a send failure. The form shows its
    // generic error toast, and the caller learns nothing about the limit.
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
  } catch (error) {
    // Unconditional: the previous `error instanceof Error` guard fell through
    // and returned undefined for anything else thrown.
    //
    // Logged, because the caller cannot be told anything. This return is
    // byte-identical to the rate-limited one above, deliberately — which also
    // means a misconfigured SMTP account, a refused connection and a caller
    // hitting the limit were indistinguishable from outside *and* from the
    // logs. Now only the first two leave a trace.
    console.error("sendEmail failed", error);

    return {
      accepted: false,
    };
  }
}
