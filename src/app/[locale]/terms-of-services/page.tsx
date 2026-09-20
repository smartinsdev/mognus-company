import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { locales } from "@/i18n-config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Terms({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("terms.services");
  return (
    <main className="pb-24 pt-32 min-h-dvh max-w-3xl px-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <section className="mb-8">
        <p className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p1")}
        </p>
        <p className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p2")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub1")}</h2>
        <p className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p3")}
        </p>
        <ul className="list-disc list-inside pl-8 space-y-2">
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list1.item1")}
          </li>
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list1.item2")}
          </li>
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list1.item3")}
          </li>
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list1.item4")}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub2")}</h2>
        <p className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p4")}
        </p>
        <p className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p5")}
        </p>
        <ul className="list-disc list-inside pl-8 space-y-2">
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list2.item1")}
          </li>
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list2.item2")}
          </li>
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list3.item3")}
          </li>
        </ul>
      </section>

      <section className="mb-b">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub3")}</h2>
        <p className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p6")}
        </p>
        <ul className="list-disc list-inside pl-8 space-y-2">
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list3.item1")}
          </li>
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list3.item2")}
          </li>
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list3.item3")}
          </li>
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list3.item4")}
          </li>
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list3.item5")}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub4")}</h2>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p7")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub5")}</h2>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p8")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub6")}</h2>
        <p className="text-sm md:text-base leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p9")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub7")}</h2>
        <p className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
          {t("p10")}
        </p>
        <ul className="list-disc list-inside pl-8 space-y-2">
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list4.item1")}
          </li>
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list4.item2")}
          </li>
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list4.item3")}
          </li>
          <li className="text-sm md:text-base mb-4 leading-relaxed wrap-break-word max-w-prose dark:text-foreground/70">
            {t("list4.item4")}
          </li>
        </ul>
      </section>
    </main>
  );
}
