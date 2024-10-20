import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n-config";
import { useTranslations } from "next-intl";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Policy({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("terms.cookies");

  return (
    <main className="pb-24 pt-32 min-h-dvh max-w-3xl px-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub1")}</h2>
        <p className="text-sm md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p1")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub2")}</h2>
        <p className="text-sm md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p2")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub3")}</h2>
        <p className="text-sm md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p3")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub4")}</h2>
        <p className="text-sm md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p4")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4">{t("sub5")}</h2>
        <p className="text-sm md:text-base leading-relaxed break-words max-w-prose dark:text-foreground/70">
          {t("p5")}
        </p>
      </section>
    </main>
  );
}
