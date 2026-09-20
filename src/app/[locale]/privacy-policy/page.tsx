import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n-config";
import { useTranslations } from "next-intl";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
        <p className="text-sm mb-4 md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p1")}
        </p>
        <p className="text-sm mb-4 md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p2")}
        </p>
        <p className="text-sm md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p3")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub1")}</h2>
        <p className="text-sm md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p4")}
        </p>
        <p className="text-sm md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p5")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub2")}</h2>
        <p className="text-sm md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p6")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub3")}</h2>
        <p className="text-sm mb-8 md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
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
        <p className="text-sm mb-8 md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p8")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub5")}</h2>
        <p className="text-sm mb-8 md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p9")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub6")}</h2>
        <p className="text-sm mb-8 md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p10")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub7")}</h2>
        <p className="text-sm mb-8 md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p11")}
        </p>
      </section>
    </main>
  );
}
