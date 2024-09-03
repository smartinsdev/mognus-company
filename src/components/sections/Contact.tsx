"use client";

import { useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { FormSchema, FormSchemaType } from "@/lib/contact-schema";
import { sendEmail } from "@/actions/send-email";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { MdError } from "react-icons/md";

export function Contact() {
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
    });
    form.reset();
  }

  return (
    <section id="contact" className="pb-24 pt-32 min-h-dvh bg-muted relative">
      <div className="flex  flex-col px-8 max-w-[1440px] mx-auto gap-14">
        <div className="flex flex-col items-center gap-4">
          <span className="uppercase tracking-widest  text-foreground/70 text-xs lg:text-sm font-semibold">
            {t("subtitle")}
          </span>
          <h2 className="font-poppins font-extrabold text-3xl uppercase">
            {t("title")}
          </h2>
        </div>
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
        </Card>
      </div>
    </section>
  );
}
