import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Project } from "@/components/sections/Project";
import { Service } from "@/components/sections/Service";
import { locales } from "@/i18n-config";

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
