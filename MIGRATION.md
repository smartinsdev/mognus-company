# Migration: dependencies, Tailwind v4, and Biome

Carried out on 2026-09-20, on the `chore/upgrade-nextjs-16` branch, across seven
commits that can each be reverted on their own.

## Summary

- Every dependency moved to its latest stable version.
- Tailwind CSS migrated from v3 to v4 (configuration in CSS, no
  `tailwind.config.ts`).
- ESLint replaced by Biome. The project did not use Prettier.
- shadcn/ui components re-vendored at the Tailwind v4 revision.
- Proven dead code and four orphaned dependencies removed.

`next`, `react`, and `react-dom` were **not** touched: they were already at the
latest version (16.3.5 / 19.3.0), updated in an earlier pass.

## Version tables

### Updated

| Package | From | To |
|---|---|---|
| `@hookform/resolvers` | 3.9 | 5.9.1 |
| `@radix-ui/react-icons` | 1.3.0 | 1.3.2 |
| `@types/node` | 20 | 26.6.2 |
| `@types/nodemailer` | 6.4.15 | 8.0.2 |
| `class-variance-authority` | 0.7.0 | 0.7.1 |
| `embla-carousel-react` | 8.1.8 | 8.6.0 |
| `nodemailer` | 6.9.14 | 10.0.10 |
| `postcss` | 8.x | 8.5.28 |
| `react-hook-form` | 7.53 | 7.88.0 |
| `react-icons` | 5.2.1 | 5.7.0 |
| `sonner` | 1.5 | 2.0.8 |
| `tailwind-merge` | 2.4 | 3.7.0 |
| `tailwindcss` | 3.4.1 | 4.3.3 |
| `typescript` | 5.x | 5.9.3 |
| `zod` | 3.23.8 | 4.6.5 |

`clsx`, `next-intl`, and `next-themes` were already at the latest version.

### Added

| Package | Version | Reason |
|---|---|---|
| `@biomejs/biome` | 2.5.14 | replaces ESLint |
| `@tailwindcss/postcss` | 4.3.3 | PostCSS plugin required by v4 |
| `tw-animate-css` | 1.4.0 | successor to `tailwindcss-animate` in v4 |
| `radix-ui` | 1.6.7 | unified package used by the shadcn v4 components |
| `lucide-react` | 1.47.0 | icons for the shadcn v4 components |

### Removed

| Package | Reason |
|---|---|
| `eslint`, `eslint-config-next` | replaced by Biome |
| `@radix-ui/react-toast` | its only consumer was the dead toast cluster |
| `@radix-ui/react-dropdown-menu` | replaced by the unified `radix-ui` package |
| `@radix-ui/react-label` | same |
| `@radix-ui/react-slot` | same |
| `tailwindcss-animate` | v3 plugin; replaced by `tw-animate-css` |

## Why TypeScript 5.9.3 and not 7.x

TypeScript 7.0.2 is the latest published version, but it is a different compiler
(a native rewrite) and support for the `{ "name": "next" }` plugin in
`tsconfig.json` still diverges. Adopting it would introduce errors unrelated to
this migration.

## Tailwind v4

The migration used `npx @tailwindcss/upgrade@4.3.3`, which converted
`tailwind.config.ts` into an `@theme` block inside `src/app/globals.css`,
swapped the PostCSS plugin, and applied the class-name codemods
(`outline-none`→`outline-hidden`, `shadow-sm`→`shadow-xs`,
`bg-gradient-to-*`→`bg-linear-to-*`, `break-words`→`wrap-break-word`).

The orange palette and `--radius: 0.75rem` were preserved: measured across both
builds, the `<body>`'s `background` and `foreground` are still `255,255,255` and
`12,10,9`.

Four things the codemod did **not** cover, done by hand:

1. **Font variables.** The `next/font` variables became
   `--font-montserrat-sans` / `--font-poppins-sans` and moved from `<body>` to
   `<html>`. In v4 the `font-montserrat` utility derives from the
   `--font-montserrat` token declared on `:root`; under the old name that token
   referenced itself, and with the variables on `<body>`, `:root` could not
   resolve them. **Without this fix the entire site fell back to a generic
   sans-serif.**

2. **`tailwindcss-animate` → `tw-animate-css`.** Not a dead dependency, despite
   appearing exactly once in the code: it powers more than 60 utilities in use
   (`animate-in`, `fade-in-0`, `slide-in-from-*`, `zoom-in-95`).

3. **`space-x` → `gap` in `NavBar`.** v4 puts the margin on the right of every
   child but the last; the `md:hidden` menu button left 12px of trailing space
   on desktop. It is the application's only `space-*` line with a
   `display:none` child.

4. **`lg:leading-none` on the Hero's `<h1>`.** In v3 the line height baked into
   `lg:text-5xl` / `xl:text-7xl` overrode `leading-snug`; in v4 it does not.
   Without the explicit class the heading gained 27px per line (108px in total,
   across 4 lines). On mobile it was already identical in both versions.

Also removed from the configuration: the `container` block (the class is never
used in the code) and the accordion keyframes (there is no accordion component
and no `@radix-ui/react-accordion` in the project).

## Biome

There was no Prettier in the project, so only ESLint was replaced. `biome.json`
configures the formatter to match the style the code already followed — 2
spaces, double quotes, semicolons — so that the formatting commit stayed
confined to the vendored shadcn files, which arrived without semicolons.

New scripts:

```
pnpm lint     # biome lint .
pnpm format   # biome format --write .
pnpm check    # biome check --write .
```

Rules adjusted deliberately, so that swapping tools would not turn into a
refactor:

| Rule | Adjustment | Reason |
|---|---|---|
| `style/noNonNullAssertion` | `off` | All 6 cases are `process.env` reads in `lib/nodemailer.ts`; satisfying the rule would change runtime behavior. |
| `suspicious/noUnknownAtRules` | `off` | Tailwind at-rules. `css.parser.tailwindDirectives` was also enabled so that `@apply` is parsed. |
| `a11y/noSvgWithoutTitle` | `warn` | Real, pre-existing problems, but fixing them requires markup changes — out of scope for this migration. |
| `a11y/noStaticElementInteractions` | `warn` | same |
| `a11y/useKeyWithClickEvents` | `warn` | same |
| `a11y/useSemanticElements` | `warn` | same |
| `suspicious/noArrayIndexKey` | `warn` | same |

At the end of the migration, `pnpm lint` finished with 0 errors and 7 warnings,
all in the categories above. They are recorded as debt to be addressed when
there is room to touch markup.

## Code removed

**Dead toast cluster.** `src/components/ui/toaster.tsx` had no importer; it
pulled in `src/hooks/use-toast.ts`, which pulled in
`src/components/ui/toast.tsx` — a closed cycle with no entry point. The
application emits toasts through `sonner`, via `ui/sonner.tsx`, mounted in the
locale layout. The three files were deleted (`src/hooks/` was left empty and
went with them) and the `@radix-ui/react-toast` dependency was removed along
with them.

**`Logo`'s `isScrolled` prop.** Declared, destructured, and never read; `NavBar`
renders `<Logo />` with no props.

**Unused imports.** Six files, mostly `import * as React` left over from the
classic JSX transform.

Criterion applied: only what has zero proven references was removed. Nothing was
removed on suspicion.

## Known and accepted visual changes

The migration was verified by comparing, at each step, 20 screenshots (3 locales
× 2 themes × 2 viewports, plus the policy pages and the interactive states)
against a baseline captured before any change, and by comparing computed styles
element by element against a build of the commit preceding Tailwind.

Biome, the dead-code removal, the 11 non-breaking updates, and the zod 4 /
nodemailer 10 migration produced **20 of 20 screenshots byte-identical** to the
baseline — zero visual change.

Tailwind v4 and the shadcn re-vendoring produced these differences, all of them
either intentional or inherent:

1. **Invalid form fields now get a destructive border.** That is the
   `aria-invalid` styling of the shadcn v4 components. Before, there was only
   the red text below the field.
2. **`Card` padding redistributed.** It moved out of `CardHeader`/`CardContent`
   (`p-6`) and onto the `Card` itself (`py-6` + `gap-6`).
3. **The header CTA text is 14px, was 12px.** The button's own `text-sm` now
   wins over the child link's `text-xs`.
4. **`FormLabel` now has block layout** and `FormItem` became `grid gap-2`. That
   also fixed a bug: in v4 `space-y-2` placed a vertical margin on the
   `<label>`, which is `display:inline` and therefore ignored it, shrinking each
   field by 8px.
5. **`Button` focus ring:** `ring-[3px] ring-ring/50`, previously `ring-1
   ring-ring`.
6. **`neutral-400` went from `163,163,163` to `161,161,161`**, an effect of v4's
   OKLCH palette. The project's own colors did not change.
7. **Paragraph line height with `leading-relaxed` went from 24px to 26px**, at
   the breakpoints where there is also an `md:text-base` or `lg:text-base`. In
   v3 the line height baked into the responsive `text-*` silently overrode
   `leading-relaxed`; in v4 `leading-relaxed` takes effect, which is what the
   code asks for in 55 places. It mainly affects the three policy pages and the
   "About us" section. **If you prefer the previous spacing, adding
   `md:leading-normal` (or `lg:leading-normal`) alongside each
   `leading-relaxed` is enough** — the Tailwind commit can be adjusted without
   touching the rest.

A latent fix v4 threw in for free: `header/SwitcherLang.tsx` uses
`focus:ring-3`. The v3 scale was 0/1/2/4/8, so that class produced no style at
all. In v4 `ring-3` is valid and the focus ring now appears on the language
switcher button.

## Pending manual verification

**Real email delivery.** There is no `.env` in the project, so nodemailer 10
could only be exercised up to the point of connection. What was verified:

- `createTransport` and `sendMail` keep the same signature;
- a real call fails with `ESOCKET` / `ECONNREFUSED` — that is, a network
  failure from having no host configured, not an API incompatibility;
- in the browser, a valid submission travels the full path and shows the
  expected error toast.

**Still to be tested with real credentials**: a successful send and the success
toast.

## Out of scope

- TypeScript 7
- Introducing a test suite (the project has none)
- Updating `next` / `react` / `react-dom`, already at the latest version
- Fixing Biome's 7 accessibility warnings
- Any refactor not required by the migrations above
