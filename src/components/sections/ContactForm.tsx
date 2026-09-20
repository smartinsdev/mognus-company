"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { sendEmail } from "@/actions/send-email";
import { FormSchema, type FormSchemaType } from "@/lib/contact-schema";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Toaster } from "../ui/sonner";
import { Textarea } from "../ui/textarea";

export function ContactForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      body: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Index.contact");

  function onSubmit(data: FormSchemaType) {
    startTransition(async () => {
      const response = await sendEmail(data);
      if (!response?.accepted) {
        toast.error(t("messages.error.title"), {
          description: (
            <div className="text-red-200">
              {t("messages.error.description")}
            </div>
          ),
          style: {
            background: "#9C1A15",
            color: "#F5F5F5",
            fontSize: "0.875rem",
          },
        });
        return;
      }
      toast.success(t("messages.success.title"), {
        description: (
          <div className="text-emerald-200">
            {t("messages.success.description")}
          </div>
        ),
        style: {
          background: "#22AB74",
          color: "#F5F5F5",
          fontSize: "0.875rem",
        },
      });
      // Only clear the form once the send actually succeeded. Called outside
      // the transition it ran before sendEmail resolved, so a failed submit
      // showed the error toast over a form the user's text had just been
      // wiped from.
      form.reset();
    });
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid  sm:grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.name.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder="Ana Maria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.email.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.email.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.phone.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.subject.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.subject.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>{t("form.body.label")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("form.body.placeholder")}
                      {...field}
                      className="min-h-20 sm:min-h-40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              type="submit"
              size={"lg"}
              className="md:justify-self-start sm:col-span-2"
            >
              {t("form.submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
      {/* Mounted with the form rather than in the root layout: this form is
          the only thing that ever calls toast(), and sonner is a chunk every
          page, including the three static policy pages, was paying for.
          Sonner renders into a fixed-position container, so its position in
          the tree has no visual effect. */}
      <Toaster position="bottom-center" />
    </Card>
  );
}
