"use client";

import dynamic from "next/dynamic";

// Same constraint as ProjectSliderLazy: dynamic() must be called from a
// client module, or the App Router does not split the chunk at all.
//
// ssr:false is what actually keeps react-hook-form, zod and sonner out of
// the initial payload — with SSR on, Next preloads the dynamic chunk from
// the prerendered HTML and nothing is saved. Nothing indexable is lost: the
// surrounding Contact section still server-renders the heading, the CEO name
// and both phone numbers, and the form needs JavaScript to submit anyway.
export const ContactForm = dynamic(
  () => import("./ContactForm").then((m) => m.ContactForm),
  {
    ssr: false,
    // Matches the real card's footprint so the swap causes no layout shift:
    // two columns of fields, a full-width textarea and the submit button.
    loading: () => (
      <div className="w-full max-w-4xl mx-auto rounded-xl border bg-card py-6">
        <div className="p-4 grid sm:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="grid gap-2">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-9 w-full rounded-md bg-muted" />
            </div>
          ))}
          <div className="grid gap-2 sm:col-span-2">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="min-h-20 sm:min-h-40 w-full rounded-md bg-muted" />
          </div>
          <div className="h-10 w-32 rounded-md bg-muted sm:col-span-2 md:justify-self-start" />
        </div>
      </div>
    ),
  }
);
