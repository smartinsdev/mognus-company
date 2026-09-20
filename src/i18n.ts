import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./i18n-config";

export default getRequestConfig(async ({ requestLocale }) => {
  // The `[locale]` segment acts as a catch-all, so fall back to the default
  // locale here. Invalid locales are rejected with a 404 in the root layout.
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
