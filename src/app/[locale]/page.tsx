import { unstable_setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/Hero";
import { locales } from "@/i18n-config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <main className="min-h-dvh">
      <Hero />
    </main>
  );
}
