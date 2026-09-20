"use client";

import dynamic from "next/dynamic";

// The dynamic() call has to live in a client module. Per
// next/dist/docs/01-app/02-guides/lazy-loading.md, "when a Server Component
// dynamically imports a Client Component, automatic code splitting is
// currently not supported" — calling dynamic() straight from Project.tsx
// would produce no chunk split at all.
//
// ssr:false, not the default: with SSR on, Next preloads the dynamic chunk
// from the prerendered HTML so it stays in the initial payload, and the
// measured cost of the homepage went up rather than down. The carousel is
// below the fold and its images carry no indexable text ("image 1".."image
// 8"), so dropping it from the HTML costs nothing.
export const ProjectSlider = dynamic(
  () => import("./ProjectSlider").then((m) => m.ProjectSlider),
  {
    ssr: false,
    // Mirrors the real slider's geometry so the swap causes no layout shift:
    // same basis classes, and aspect-3/4 matches the 768x1024 source images.
    loading: () => (
      <div className="flex flex-col items-center gap-6">
        <div className="flex overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 md:basis-1/3"
            >
              <div className="aspect-3/4 w-full rounded-md bg-muted" />
            </div>
          ))}
        </div>
        <div className="h-4" />
      </div>
    ),
  }
);
