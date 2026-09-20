import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n-config";

const proxy = createMiddleware(routing);

export default proxy;

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|fr|pt)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
