"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

// `retry`, not `reset`. Both exist, but retry() re-fetches and re-renders the
// boundary's children, while reset() only clears the error state and re-renders
// what is already in memory — so reset() on a failed server render just fails
// again. retry() became stable in 16.3.0 and the docs point at it for this case.
type ErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

// An error boundary has to be a Client Component, and this one sits inside
// `[locale]/layout.tsx` — a boundary catches its segment's page and children,
// never its own segment's layout. So NextIntlClientProvider is always mounted
// above it and the copy below can be translated. Errors in the layout itself
// fall through to app/global-error.tsx, which cannot be.
export default function LocaleError({ error, retry }: ErrorProps) {
  const t = useTranslations("Error");

  useEffect(() => {
    // Nothing collects this yet. Until something does, the console is the only
    // place the digest is recoverable — the message itself is redacted in
    // production builds, so the digest is what ties a report to a server log.
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-dvh max-w-3xl mx-auto px-8 pt-32 pb-24 flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="font-poppins text-3xl font-extrabold uppercase">
        {t("title")}
      </h1>
      <p className="text-sm md:text-base leading-relaxed max-w-prose dark:text-foreground/70">
        {t("description")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <Button className="uppercase tracking-wide" onClick={retry} size="lg">
          {t("cta")}
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link className="uppercase tracking-wide" href="/">
            {t("home")}
          </Link>
        </Button>
      </div>
    </main>
  );
}
