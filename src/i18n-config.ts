import { LocalePrefix, Pathnames } from "next-intl/routing";

export const defaultLocale = "en" as const;
export const locales = ["en", "fr", "pt"] as const;

export const localePrefix: LocalePrefix<typeof locales> = "always";

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
};
