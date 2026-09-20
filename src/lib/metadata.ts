import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n-config";
import {
  languageAlternates,
  localeUrl,
  OG_IMAGE,
  OG_LOCALES,
  SITE_NAME,
} from "./site";

type PageMetadataOptions = {
  locale: string;
  /** Path suffix under `[locale]`; `""` is the homepage. */
  route?: string;
  /**
   * Page name, already translated. Omit on the homepage so it keeps the site
   * title from the layout; anywhere else the layout's title template turns
   * this into `<title> | Mognu's Company`.
   */
  title?: string;
};

/**
 * Per-page metadata: canonical, hreflang and the social cards.
 *
 * These cannot live in the layout. Metadata from nested segments is merged
 * shallowly and duplicate keys replace rather than merge, so a single
 * `alternates` in the layout would hand every policy page the homepage's
 * canonical — telling Google those three pages are duplicates of `/`.
 *
 * It is also why `openGraph` is rebuilt in full here rather than partly
 * inherited: a page that sets any `openGraph` field drops every one the layout
 * defined. Building the whole block in one helper is the shape the Next docs
 * recommend for exactly this case.
 */
export async function pageMetadata({
  locale,
  route = "",
  title,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });

  const url = localeUrl(locale, route);
  const description = t("description");
  // The title template only applies to the document title. A social card has
  // no parent to inherit from, so the brand is appended here by hand.
  const socialTitle = title ? `${title} | ${SITE_NAME}` : t("title");

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(route),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url,
      images: [{ ...OG_IMAGE, alt: SITE_NAME }],
      locale: OG_LOCALES[locale],
      alternateLocale: locales
        .filter((other) => other !== locale)
        .map((other) => OG_LOCALES[other]),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
