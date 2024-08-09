import { unstable_setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/Hero";

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
