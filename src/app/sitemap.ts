import type { MetadataRoute } from "next";
import { locales } from "@/i18n-config";
import { languageAlternates, localeUrl, ROUTES } from "@/lib/site";

// Replaces public/sitemap.xml, which listed exactly one URL — the apex — and
// `localePrefix: "always"` means the apex is a redirect. So the only thing the
// old sitemap offered a crawler was a 308, and none of the twelve real pages
// (3 locales x 4 routes) appeared at all.
//
// lastModified is build time. For a site whose content ships with the build
// that is close enough to true, and the alternative — the frozen 2024-07-17 in
// the old file — ages into a straight lie. It does mean an unrelated deploy
// re-signals "changed"; that is the cost of not tracking per-page dates by
// hand.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: localeUrl(locale, route),
      lastModified,
      // The homepage carries the marketing content and is the only page worth
      // ranking. The three policy pages are boilerplate that exists to be
      // linked, not found.
      changeFrequency: (route === "" ? "monthly" : "yearly") as
        | "monthly"
        | "yearly",
      priority: route === "" ? 1 : 0.3,
      alternates: {
        languages: languageAlternates(route),
      },
    }))
  );
}
