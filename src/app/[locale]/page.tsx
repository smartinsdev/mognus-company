import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/Hero";
import { locales } from "@/i18n-config";
import { About } from "@/components/sections/About";
import { Service } from "@/components/sections/Service";
import { Project } from "@/components/sections/Project";
import { Contact } from "@/components/sections/Contact";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="min-h-dvh">
      <Hero />
      <About />
      <Service />
      <Project />
      <Contact />
    </main>
  );
}
