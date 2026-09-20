import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export type FormSchemaType = z.infer<typeof FormSchema>;

export const FormSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Name is required" })
    .max(80, { error: "Name must be at most 80 characters long" }),
  email: z
    .email({ error: "Invalid email address" })
    .min(1, { error: "Email is required" }),
  phone: z
    .string()
    .regex(phoneRegex, { error: "Phone number not valid" })
    .min(1, { error: "Phone number is required" }),
  subject: z
    .string()
    .min(1, { error: "Subject is required" })
    .max(80, { error: "Subject must be at most 80 characters long" }),
  body: z
    .string()
    .min(10, { error: "Message must be at least 10 characters long" })
    .max(500, { error: "Message must be at most 500 characters long" })
    .trim(),
});
