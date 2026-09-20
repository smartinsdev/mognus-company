import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Project } from "@/components/sections/Project";
import { Service } from "@/components/sections/Service";
import { pageMetadata } from "@/lib/metadata";

// No `title`: the homepage keeps the site title from the layout rather than
// running it through the `%s | Mognu's Company` template and repeating itself.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale });
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
