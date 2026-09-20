import { locales, routing } from "@/i18n-config";

// One origin, used by app/robots.ts, app/sitemap.ts and the layout's
// generateMetadata. Before this the three disagreed: the metadata advertised
// the apex (`https://mognuscompany.com`) while public/robot.txt pointed
// crawlers at the www host, so the canonical signal and the sitemap claimed
// two different sites.
//
// This assumes the apex 301s to www at the DNS/hosting layer. If it does not,
// every canonical emitted below resolves through a redirect.
export const SITE_URL = "https://www.mognuscompany.com";

export const SITE_NAME = "Mognu's Company";

// Resolved against metadataBase, so it follows SITE_URL rather than repeating
// the host. 1200x630 is the size the file already is.
export const OG_IMAGE = {
  url: "/mognus-opgraph.jpg",
  width: 1200,
  height: 630,
} as const;

// Open Graph wants a language_TERRITORY tag, not the bare code the routes use.
// The territories follow the company's two markets; `en` is the international
// catch-all and gets GB as the nearest European variant.
export const OG_LOCALES: Record<string, string> = {
  en: "en_GB",
  fr: "fr_FR",
  pt: "pt_PT",
};

// Every page under `[locale]`, as a path suffix. `""` is the homepage. The
// sitemap crosses this with `locales` to produce the full URL set; keeping it
// here means a new page is added in one place rather than remembered.
export const ROUTES = [
  "",
  "/terms-of-services",
  "/privacy-policy",
  "/cookies-policy",
] as const;

/**
 * Absolute URL for a route in a locale. `localePrefix` is "always", so every
 * path carries its prefix — there is no unprefixed variant to link to.
 */
export function localeUrl(locale: string, route: string = ""): string {
  return `${SITE_URL}/${locale}${route}`;
}

/**
 * The `alternates.languages` map for a route: every locale pointing at its own
 * translation of that same page, plus `x-default`.
 *
 * The self-reference is deliberate — Google discards an hreflang set whose
 * members do not all point back at each other, including at themselves.
 *
 * `x-default` resolves to the default locale rather than to `/`. `/` is the
 * page that negotiates Accept-Language, which is the textbook x-default
 * target, but it answers with a redirect; pointing crawlers at a 200 they can
 * actually index is worth more here than the exact semantics.
 */
export function languageAlternates(route: string = ""): Record<string, string> {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, localeUrl(locale, route)])
    ),
    "x-default": localeUrl(routing.defaultLocale, route),
  };
}
