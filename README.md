# Mognu's Company

Mognu's Company is a multilingual corporate website for a custom carpentry and furniture business. It presents the company, its services, selected projects, and a contact channel in a polished, responsive interface designed for international visitors.

The site is built with the Next.js App Router and uses localized routes for English, French, and Portuguese content.

## Features

- **Localized experience** with English (`en`), French (`fr`), and Portuguese (`pt`) translations, including the header, footer, projects section, metadata, and error screens.
- **Responsive company landing page** organized into Hero, About, Services, Projects, and Contact sections.
- **Project showcase** with a reusable carousel/slider component, lazy-loaded below the fold.
- **Service cards** for presenting the company’s offerings.
- **Contact form** validated on the client with React Hook Form and Zod, and validated again on the server — the Server Action treats its input as untrusted.
- **Rate-limited email delivery** through a Next.js Server Action and Nodemailer: three messages per client per ten minutes, with the SMTP configuration checked at send time so a misconfigured deploy fails loudly instead of silently.
- **Light and dark themes** with system-theme detection and a theme switcher.
- **Accessible UI primitives** built with shadcn/ui components on top of Radix UI and Tailwind.
- **Feedback notifications** using Sonner, mounted with the contact form rather than globally.
- **Localized SEO**: per-page canonical URLs, `hreflang` alternates (including `x-default`), Open Graph and Twitter cards in the active locale, plus favicons and a web manifest.
- **Generated `robots.txt` and `sitemap.xml`** derived from the locale and route lists, so adding a language or page updates both automatically.
- **Localized 404 and error boundaries**, with a last-resort global error screen for failures in the root layout.
- **Custom typography** using the Montserrat and Poppins Google fonts through `next/font`, limited to the weights the markup actually renders.
- **Legal pages** for privacy policy, cookies policy, and terms of service.

## Tech Stack

- **Framework:** Next.js 16 with the App Router (Turbopack is the default bundler)
- **Language:** TypeScript 5.9
- **UI:** React 19
- **Styling:** Tailwind CSS v4 (CSS-first configuration, no `tailwind.config.ts`) via `@tailwindcss/postcss`, with `tw-animate-css`
- **Components:** shadcn/ui (`new-york` style) on the unified `radix-ui` package, with `lucide-react` icons
- **Internationalization:** `next-intl` 4
- **Forms:** React Hook Form and Zod 4
- **Themes:** `next-themes`
- **Carousel:** Embla Carousel React
- **Email:** Nodemailer 10
- **Notifications:** Sonner
- **Linting & formatting:** Biome (replaces ESLint; the project never used Prettier)
- **Package manager:** pnpm (lockfile included)

## Architecture

The application follows a feature-oriented Next.js App Router structure:

```text
.
├── public/                     # Favicons, web manifest, Open Graph image
├── messages/                   # Translation dictionaries for en, fr, and pt
├── src/
│   ├── actions/                # Server Actions, including contact email submission
│   ├── app/
│   │   ├── [locale]/           # Locale-aware routes, layout, and error boundaries
│   │   │   └── [...rest]/      # Catch-all so unmatched paths hit the localized 404
│   │   ├── global-error.tsx    # Last resort when the locale layout itself throws
│   │   ├── globals.css         # Tailwind v4 @theme tokens and base styles
│   │   ├── robots.ts           # Generated robots.txt
│   │   └── sitemap.ts          # Generated sitemap.xml
│   ├── assets/                 # Imported project and brand assets
│   ├── components/             # Theme provider, mode toggle, slider, service card
│   │   ├── header/             # Navigation, logo, mobile menu, and language switcher
│   │   ├── footer/             # Site footer
│   │   ├── sections/           # Hero, About, Services, Projects, and Contact sections
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   ├── site.ts             # Canonical origin, route list, hreflang helpers
│   │   ├── metadata.ts         # Per-page canonical, hreflang, and social cards
│   │   ├── contact-schema.ts   # Zod schema shared by the form and the action
│   │   ├── nodemailer.ts       # SMTP transport, built on first send
│   │   ├── rate-limit.ts       # In-memory fixed-window counter
│   │   └── utils.ts            # Class-name helper
│   ├── i18n-config.ts          # Locale list and next-intl routing definition
│   ├── i18n.ts                 # Internationalization request configuration
│   ├── navigation.ts           # Locale-aware Link, redirect, and router helpers
│   └── proxy.ts                # Locale routing (Next.js 16 renamed middleware to proxy)
├── biome.json                  # Lint and format configuration
├── components.json             # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration with next-intl integration
├── postcss.config.mjs          # Tailwind v4 PostCSS plugin
└── package.json                # Scripts and dependencies
```

The home page composes independent section components, and the locale segment (`src/app/[locale]`) statically generates every localized page. `src/proxy.ts` applies the locale prefix to incoming requests, and `next-intl` loads the matching message dictionary.

Most of the tree renders on the server. Only the parts that need browser state are Client Components — the mobile menu toggle, the theme and language switchers, the carousel, and the contact form — and the carousel and contact form are loaded dynamically so their dependencies stay out of the initial payload. The layout hands the client provider only the namespaces client components actually read, rather than the whole catalogue.

Contact submissions are validated with Zod in the browser, re-validated in the Server Action, rate limited per client, and sent through a server-only Nodemailer integration, keeping SMTP credentials out of the browser.

SEO metadata is built per page rather than in the layout: Next.js merges metadata shallowly, so a single `alternates` block in the layout would give every policy page the homepage's canonical URL. `src/lib/metadata.ts` builds the canonical, `hreflang`, and social cards for each route, and `src/lib/site.ts` holds the single origin that the pages, `robots.ts`, and `sitemap.ts` all agree on.

## Getting Started

### Prerequisites

- Node.js 20.9 or newer (required by Next.js 16)
- pnpm
- SMTP credentials for the contact form

### Installation

```bash
pnpm install
```

Create a `.env.local` file in the project root with the SMTP configuration used by the contact form:

```env
NODEMAILER_HOST=smtp.example.com
NODEMAILER_PORT=587
NODEMAILER_AUTH_USER=your-smtp-user
NODEMAILER_AUTH_PASSWORD=your-smtp-password
NODEMAILER_SENDER=website@example.com
NODEMAILER_RECIPIENT=contact@example.com
```

All six are required. If any is missing or blank, the contact form's send throws with the names of the missing variables instead of failing quietly. The rest of the site runs without them.

### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and visit a localized route such as `/en`, `/fr`, or `/pt`.

## Available Scripts

```bash
pnpm dev       # Start the development server (Turbopack)
pnpm build     # Create a production build
pnpm start     # Start the production server
pnpm lint      # Run Biome's linter
pnpm format    # Format with Biome
pnpm check     # Run Biome's linter, formatter, and import sorting, applying fixes
```

`pnpm lint` reports no errors. The warnings that remain are accessibility rules deliberately left at `warn` because clearing them means changing markup; `MIGRATION.md` lists which rules and why.

## Localization

Translation files are stored in `messages/`:

- `messages/en.json` — English
- `messages/fr.json` — French
- `messages/pt.json` — Portuguese

Each file carries the same namespaces: `Meta` (SEO copy), `Index` (the landing page), `terms` (the three legal pages), `SwitchLang`, `Footer`, `NotFound`, and `Error`.

The default locale is English, and all supported locales use a URL prefix (`localePrefix: "always"`), so `/` redirects rather than serving a page. To add a language, add it to `locales` in `src/i18n-config.ts`, add the matching `messages/<locale>.json`, and add its `language_TERRITORY` tag to `OG_LOCALES` in `src/lib/site.ts` — the routing, static params, sitemap, and `hreflang` alternates all derive from that list.

## Deployment

The project is compatible with standard Next.js hosting platforms, including Vercel.

- Configure the six `NODEMAILER_*` environment variables in the deployment environment before enabling the contact form in production.
- The canonical origin is `https://www.mognuscompany.com`, defined once as `SITE_URL` in `src/lib/site.ts`. Change it there when deploying to a different host; the pages' canonicals, the sitemap, and `robots.txt` all read from it. It assumes the apex domain redirects to `www` at the DNS or hosting layer.
- The rate limiter is per process and in memory. Across multiple instances each keeps its own counters, and a deploy resets them. A hard ceiling needs a shared store such as Redis or the platform's own limiter.

## Further Reading

- `MIGRATION.md` — the dependency, Tailwind v4, and Biome migration: version tables, what the codemods missed, and the accepted visual differences.
- `AGENTS.md` / `CLAUDE.md` — notes for coding agents, pointing at the Next.js docs bundled in `node_modules/next/dist/docs/`.
- `docs/` — design and implementation notes kept alongside the work.

## License

MIT License
