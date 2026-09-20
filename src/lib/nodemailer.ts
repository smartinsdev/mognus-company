import nodemailer from "nodemailer";

import type { FormSchemaType } from "./contact-schema";

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST!,
  port: +process.env.NODEMAILER_PORT!,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER!,
    pass: process.env.NODEMAILER_AUTH_PASSWORD!,
  },
});

export async function send(sender: FormSchemaType) {
  const response = await transporter.sendMail({
    from: process.env.NODEMAILER_SENDER!,
    to: process.env.NODEMAILER_RECIPIENT!,
    subject: sender.subject,
    text: `Name: ${sender.name}\nphone: ${sender.phone}\nemail: ${sender.email}\n\n${sender.body}`,
  });

  return response;
}
