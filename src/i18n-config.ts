import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "pt"] as const;

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});
