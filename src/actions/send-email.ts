"use server";

import { FormSchemaType } from "@/lib/contact-schema";
import { send } from "@/lib/nodemailer";
import { useTranslations } from "next-intl";

export async function sendEmail(values: FormSchemaType) {
  try {
    await send(values);

    return {
      accepted: true,
    };
  } catch (error) {
    if (error instanceof Error)
      return {
        accepted: false,
      };
  }
}
