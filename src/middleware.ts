import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "./i18n-config";

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|fr|pt)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
