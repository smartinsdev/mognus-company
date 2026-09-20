import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { pageMetadata } from "@/lib/metadata";

// The title is the page's own heading, so the two never drift apart. The
// layout's template appends the brand.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms.cookies" });

  return pageMetadata({ locale, route: "/cookies-policy", title: t("title") });
}

export default function Policy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("terms.cookies");

  return (
    <main className="pb-24 pt-32 min-h-dvh max-w-3xl px-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub1")}</h2>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p1")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub2")}</h2>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p2")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub3")}</h2>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p3")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub4")}</h2>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p4")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub5")}</h2>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p5")}
        </p>
      </section>
    </main>
  );
}
