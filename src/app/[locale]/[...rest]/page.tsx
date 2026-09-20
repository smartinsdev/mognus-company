import { notFound } from "next/navigation";

// Exists so that unmatched paths render the 404 in `[locale]/not-found.tsx`
// instead of Next's built-in one.
//
// A `not-found.tsx` inside a dynamic segment only catches `notFound()` thrown
// by a route that segment actually matched. `/en/nonexistent` matches no route
// at all, so routing never descends into `[locale]` and the boundary there
// never gets a chance — verified before adding this file: the response was a
// bare <html> with no `lang` attribute and no nav or footer.
//
// This catch-all gives those paths something to match. It renders inside
// `[locale]/layout.tsx`, throws immediately, and the sibling not-found
// boundary answers with the locale, the chrome and the right copy. Static
// segments take precedence over a catch-all, so the four real pages are
// unaffected.
export default function CatchAllNotFound() {
  notFound();
}
