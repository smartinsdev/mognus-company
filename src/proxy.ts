import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n-config";

const proxy = createMiddleware(routing);

export default proxy;

export const config = {
  // One pattern, not three. The previous list also carried `/` and
  // `/(en|fr|pt)/:path*`, both of which this already matches — and the locale
  // alternative was a second place to edit when adding a language.
  //
  // Everything except Next's internals and any path containing a dot, which is
  // how the static files (robots.txt, sitemap.xml, site.webmanifest, the
  // images) stay out of the locale redirect.
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
