"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { sendEmail } from "@/actions/send-email";
import fr from "@/assets/fr.png";
import pt from "@/assets/pt.png";
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
      // Only clear the form once the send actually succeeded. Called outside
      // the transition it ran before sendEmail resolved, so a failed submit
      // showed the error toast over a form the user's text had just been
      // wiped from.
      form.reset();
    });
  }

  return (
    <section id="contact" className="pt-24 lg:pt-32 bg-muted relative">
      <div className="flex  flex-col px-8 max-w-[1440px] mx-auto gap-14">
        <div className="flex flex-col items-center gap-4">
          <span className="uppercase tracking-widest  text-foreground/70 text-xs lg:text-sm font-semibold">
            {t("subtitle")}
          </span>
          <h2 className="font-poppins font-extrabold text-3xl uppercase">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:gap-0 md:grid-cols-2 ">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col gap-6 items-start">
              <div className="flex flex-col">
                <h3 className="text-2xl md:text-3xl font-montserrat font-semibold ">
                  Jardel Freitas
                </h3>
                <span className="text-xs text-muted-foreground">
                  CEO & Master Carpenter
                </span>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src={pt}
                    alt="image represents the flag of portugal"
                    className="w-5"
                  />

                  <p className="text-sm md:text-lg">+351 930 636 700</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src={fr}
                    alt="image represents the flag of France"
                    className="w-5"
                  />

                  <p className="text-sm md:text-lg">+33 06 46 04 14 75</p>
                </div>
              </div>
            </div>
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
      </div>
      <div className="overflow-hidden relative -bottom-0.5 w-full h-fit">
        <svg
          id="wave"
          style={{ transform: "rotate(0deg); transition: 0.3s" }}
          viewBox="0 0 1440 220"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(243, 106, 62, 1)" offset="0%"></stop>
              <stop stopColor="rgba(255, 179, 11, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            className="fill-[#0c0a09]"
            style={{ transform: "translate(0, 0px); opacity:1" }}
            fill="url(#sw-gradient-0)"
            d="M0,88L34.3,95.3C68.6,103,137,117,206,128.3C274.3,139,343,147,411,135.7C480,125,549,95,617,91.7C685.7,88,754,110,823,124.7C891.4,139,960,147,1029,132C1097.1,117,1166,81,1234,69.7C1302.9,59,1371,73,1440,73.3C1508.6,73,1577,59,1646,51.3C1714.3,44,1783,44,1851,40.3C1920,37,1989,29,2057,40.3C2125.7,51,2194,81,2263,91.7C2331.4,103,2400,95,2469,88C2537.1,81,2606,73,2674,88C2742.9,103,2811,139,2880,139.3C2948.6,139,3017,103,3086,84.3C3154.3,66,3223,66,3291,55C3360,44,3429,22,3497,40.3C3565.7,59,3634,117,3703,146.7C3771.4,176,3840,176,3909,150.3C3977.1,125,4046,73,4114,51.3C4182.9,29,4251,37,4320,33C4388.6,29,4457,15,4526,14.7C4594.3,15,4663,29,4731,36.7C4800,44,4869,44,4903,44L4937.1,44L4937.1,220L4902.9,220C4868.6,220,4800,220,4731,220C4662.9,220,4594,220,4526,220C4457.1,220,4389,220,4320,220C4251.4,220,4183,220,4114,220C4045.7,220,3977,220,3909,220C3840,220,3771,220,3703,220C3634.3,220,3566,220,3497,220C3428.6,220,3360,220,3291,220C3222.9,220,3154,220,3086,220C3017.1,220,2949,220,2880,220C2811.4,220,2743,220,2674,220C2605.7,220,2537,220,2469,220C2400,220,2331,220,2263,220C2194.3,220,2126,220,2057,220C1988.6,220,1920,220,1851,220C1782.9,220,1714,220,1646,220C1577.1,220,1509,220,1440,220C1371.4,220,1303,220,1234,220C1165.7,220,1097,220,1029,220C960,220,891,220,823,220C754.3,220,686,220,617,220C548.6,220,480,220,411,220C342.9,220,274,220,206,220C137.1,220,69,220,34,220L0,220Z"
          ></path>
        </svg>
      </div>
      {/* Mounted here rather than in the root layout: this is the only
          component that ever calls toast(), and sonner is a 37KB gzip chunk
          that every page, including the three static policy pages, was
          paying for. Sonner renders into a fixed-position container, so the
          position in the tree has no visual effect. */}
      <Toaster position="bottom-center" />
    </section>
  );
}
