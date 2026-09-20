import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

// Sits under `[locale]` rather than at the app root, because that is where the
// 404s actually land. The proxy prefixes the default locale onto anything it
// does not recognise — `/es` 307s to `/en/es`, `/nonexistent` to
// `/en/nonexistent` — so a request that misses every route is always inside a
// valid locale by then. The `notFound()` in the layout is unreachable in
// production for the same reason; it stays as a guard for direct rendering.
//
// Reaching this boundary at all needs the sibling `[...rest]` catch-all; see
// the note there.
//
// What the browser ends up with, measured rather than assumed: `lang="fr"` on
// a French 404, the stylesheet, the body classes, the nav and the footer. That
// arrives on hydration, not in the initial HTML — `notFound()` responds with
// Next's error shell (`<html id="__next_error__">`, empty body, no stylesheet
// link) and React swaps in the real tree from the flight payload. Importing
// globals.css here does not move it earlier; it was tried and changed nothing.
//
// So a client with no JavaScript sees a blank page carrying a 404 status.
// That is acceptable for this route and this route only: Next marks it
// `noindex` automatically, so the readers who would be hurt by an empty body
// are the ones told not to look.
//
// A Server Component: useTranslations resolves against the request config the
// layout's setRequestLocale already established, so none of this copy reaches
// the client bundle.
export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="min-h-dvh max-w-3xl mx-auto px-8 pt-32 pb-24 flex flex-col items-center justify-center gap-6 text-center">
      <p className="font-poppins text-7xl font-extrabold text-primary">404</p>
      <h1 className="font-poppins text-3xl font-extrabold uppercase">
        {t("title")}
      </h1>
      <p className="text-sm md:text-base leading-relaxed max-w-prose dark:text-foreground/70">
        {t("description")}
      </p>
      <Button asChild size="lg">
        <Link className="uppercase tracking-wide mt-2" href="/">
          {t("cta")}
        </Link>
      </Button>
    </main>
  );
}
