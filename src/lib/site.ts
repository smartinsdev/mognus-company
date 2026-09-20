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
