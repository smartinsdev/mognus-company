import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { locales } from "@/i18n-config";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// The title is the page's own heading, so the two never drift apart. The
// layout's template appends the brand.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms.privacy" });

  return pageMetadata({ locale, route: "/privacy-policy", title: t("title") });
}

export default function Policy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("terms.privacy");
  return (
    <main className="pb-24 pt-32 min-h-dvh max-w-3xl px-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <section className="mb-8">
        <p className="text-sm mb-4 md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p1")}
        </p>
        <p className="text-sm mb-4 md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p2")}
        </p>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p3")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub1")}</h2>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p4")}
        </p>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p5")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub2")}</h2>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p6")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub3")}</h2>
        <p className="text-sm mb-8 md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p7")}
        </p>
        <ul className="list-disc list-inside pl-8 space-y-2">
          <li className="text-sm md:text-base leading-relaxed dark:text-foreground/70">
            {t("list1.item1")}
          </li>
          <li className="text-sm md:text-base leading-relaxed dark:text-foreground/70">
            {t("list1.item2")}
          </li>
          <li className="text-sm md:text-base leading-relaxed dark:text-foreground/70">
            {t("list1.item3")}
          </li>
          <li className="text-sm md:text-base leading-relaxed dark:text-foreground/70">
            {t("list1.item4")}
          </li>
          <li className="text-sm md:text-base leading-relaxed dark:text-foreground/70">
            {t("list1.item5")}
          </li>
          <li className="text-sm md:text-base leading-relaxed dark:text-foreground/70">
            {t("list1.item6")}
          </li>
          <li className="text-sm md:text-base leading-relaxed dark:text-foreground/70">
            {t("list1.item7")}
          </li>
          <li className="text-sm md:text-base leading-relaxed dark:text-foreground/70">
            {t("list1.item8")}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub4")}</h2>
        <p className="text-sm mb-8 md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p8")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub5")}</h2>
        <p className="text-sm mb-8 md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p9")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub6")}</h2>
        <p className="text-sm mb-8 md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p10")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub7")}</h2>
        <p className="text-sm mb-8 md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p11")}
        </p>
      </section>
    </main>
  );
}
