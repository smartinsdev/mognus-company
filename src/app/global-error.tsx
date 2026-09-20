"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

// Last resort: this only renders when `[locale]/layout.tsx` itself throws, so
// it replaces the root layout and must supply its own <html> and <body>.
//
// Two things follow from that, and both are why this file looks nothing like
// error.tsx:
//
//   - No NextIntlClientProvider, and no `params` to read a locale from. The
//     copy is English only. Guessing from navigator.language would render
//     different text on the server and the client, which is a hydration error
//     inside the boundary that exists to handle errors.
//   - No stylesheet. globals.css is imported by the layout that just failed,
//     and Next's error shell does not carry a segment's CSS — measured on the
//     404 route, where importing it from the boundary changed nothing. Hence
//     inline styles, and colours that read on either default background rather
//     than a theme token that will not resolve.
export default function GlobalError({ error, retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          color: "#0c0a09",
          background: "#fafaf9",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>
          Something went wrong
        </h1>
        <p style={{ margin: 0, maxWidth: "45ch", lineHeight: 1.6 }}>
          An unexpected error occurred. Please try again.
        </p>
        {/* The digest is the only identifier that survives into production —
            the message is redacted — so it is shown rather than hidden, to
            give anyone reporting this something to quote. */}
        {error.digest ? (
          <code style={{ fontSize: "0.75rem", color: "#78716c" }}>
            {error.digest}
          </code>
        ) : null}
        <button
          onClick={retry}
          style={{
            marginTop: "0.5rem",
            padding: "0.625rem 1.25rem",
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#fafaf9",
            background: "#ea580c",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
          type="button"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
