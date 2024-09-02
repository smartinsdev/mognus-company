import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export type FormSchemaType = z.infer<typeof FormSchema>;

export const FormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(80, { message: "Name must be at most 80 characters long" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Phone number not valid" })
    .min(1, { message: "Phone number is required" }),
  subject: z
    .string()
    .min(1, { message: "Subject is required" })
    .max(80, { message: "Subject must be at most 80 characters long" }),
  body: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(500, { message: "Message must be at most 500 characters long" })
    .trim(),
});
