import nodemailer, { type Transporter } from "nodemailer";

import type { FormSchemaType } from "./contact-schema";

const REQUIRED = [
  "NODEMAILER_HOST",
  "NODEMAILER_PORT",
  "NODEMAILER_AUTH_USER",
  "NODEMAILER_AUTH_PASSWORD",
  "NODEMAILER_SENDER",
  "NODEMAILER_RECIPIENT",
] as const;

type RequiredEnv = (typeof REQUIRED)[number];

/**
 * Reads the SMTP configuration, naming what is missing.
 *
 * Was six `process.env.X!` assertions. The `!` silences the type error without
 * checking anything, so an unset host reached nodemailer as `undefined` and an
 * unset port became `+undefined`, i.e. `NaN`. The send then failed somewhere
 * inside the transport and the action turned that into the same
 * `{ accepted: false }` it returns for a rate-limited caller — so a deploy
 * missing its SMTP variables looked exactly like a deploy working normally,
 * from both the user's side and the logs.
 */
function readEnv(): Record<RequiredEnv, string> {
  const missing = REQUIRED.filter((name) => !process.env[name]?.trim());

  if (missing.length > 0) {
    throw new Error(
      `nodemailer is not configured: missing ${missing.join(", ")}`
    );
  }

  return Object.fromEntries(
    REQUIRED.map((name) => [name, process.env[name] as string])
  ) as Record<RequiredEnv, string>;
}

let transporter: Transporter | null = null;

/**
 * Built on first send rather than at module load.
 *
 * At module scope a throw here would take down whatever imported it — during a
 * build that is the build, for a fault that only ever affects the contact
 * form. Deferring it keeps a misconfigured SMTP account to the one request
 * that needs SMTP.
 */
function getTransporter(): Transporter {
  if (transporter) {
    return transporter;
  }

  const env = readEnv();
  const port = Number.parseInt(env.NODEMAILER_PORT, 10);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(
      `nodemailer is not configured: NODEMAILER_PORT is not a valid port (${env.NODEMAILER_PORT})`
    );
  }

  transporter = nodemailer.createTransport({
    host: env.NODEMAILER_HOST,
    port,
    // 465 is implicit TLS; everything else starts in the clear and upgrades.
    // Left to nodemailer's own default before, which infers the same thing —
    // stated here because the port and this flag have to agree and a silent
    // inference is easy to break by changing only the port.
    secure: port === 465,
    auth: {
      user: env.NODEMAILER_AUTH_USER,
      pass: env.NODEMAILER_AUTH_PASSWORD,
    },
  });

  return transporter;
}

export async function send(sender: FormSchemaType) {
  const response = await getTransporter().sendMail({
    from: process.env.NODEMAILER_SENDER,
    to: process.env.NODEMAILER_RECIPIENT,
    // The visitor's address goes here, not in `from`: `from` has to stay on
    // the authenticated domain or SPF and DKIM fail and the message is
    // filtered. This is what makes a reply in the mail client reach them.
    replyTo: sender.email,
    subject: sender.subject,
    text: `Name: ${sender.name}\nphone: ${sender.phone}\nemail: ${sender.email}\n\n${sender.body}`,
  });

  return response;
}
