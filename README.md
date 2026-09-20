# Mognu's Company

Mognu's Company is a multilingual corporate website for a custom carpentry and furniture business. It presents the company, its services, selected projects, and a contact channel in a polished, responsive interface designed for international visitors.

The site is built with Next.js App Router and uses localized routes for English, French, and Portuguese content.

## Features

- **Localized experience** with English (`en`), French (`fr`), and Portuguese (`pt`) translations.
- **Responsive company landing page** organized into Hero, About, Services, Projects, and Contact sections.
- **Project showcase** with a reusable carousel/slider component.
- **Service cards** for presenting the company’s offerings.
- **Contact form** with client-side validation for name, email, phone, subject, and message.
- **Server-side email delivery** through a Next.js Server Action and Nodemailer.
- **Light and dark themes** with system-theme detection and a theme switcher.
- **Accessible UI primitives** built with Radix UI and reusable Tailwind-based components.
- **Feedback notifications** using Sonner/toast components.
- **SEO and sharing metadata**, including favicons, web manifest, Open Graph image, Twitter card data, robots file, and sitemap.
- **Custom typography** using the Montserrat and Poppins Google fonts through `next/font`.
- **Legal pages** for privacy policy, cookies policy, and terms of service.

## Tech Stack

- **Framework:** Next.js 14 with the App Router
- **Language:** TypeScript
- **UI:** React 18
- **Styling:** Tailwind CSS, PostCSS, and custom global styles
- **Internationalization:** `next-intl`
- **Forms:** React Hook Form and Zod
- **UI primitives:** Radix UI
- **Themes:** `next-themes`
- **Carousel:** Embla Carousel React
- **Email:** Nodemailer
- **Notifications:** Sonner
- **Package manager:** pnpm (lockfile included)

## Architecture

The application follows a feature-oriented Next.js App Router structure:

```text
.
├── public/                 # Static images, icons, manifest, sitemap, and robots file
├── src/
│   ├── actions/            # Server Actions, including contact email submission
│   ├── app/
│   │   └── [locale]/       # Locale-aware routes and page layouts
│   ├── assets/             # Imported project and brand assets
│   ├── components/
│   │   ├── header/         # Navigation, logo, mobile menu, and language switcher
│   │   ├── footer/         # Site footer
│   │   ├── sections/        # Hero, About, Services, Projects, and Contact sections
│   │   └── ui/              # Reusable Radix/Tailwind UI components
│   ├── hooks/              # Shared React hooks
│   ├── lib/                # Validation, email transport, and utility functions
│   ├── i18n-config.ts      # Supported locales and locale behavior
│   ├── i18n.ts             # Internationalization request configuration
│   ├── navigation.ts       # Localized navigation helpers
│   └── middleware.ts       # Locale routing middleware
├── messages/               # Translation dictionaries for en, fr, and pt
├── next.config.mjs         # Next.js configuration with next-intl integration
├── tailwind.config.ts      # Tailwind CSS configuration
└── package.json             # Scripts and dependencies
```

The home page composes independent section components, while the locale segment (`src/app/[locale]`) enables statically generated localized pages. `next-intl` middleware applies the locale prefix to routes and loads the corresponding message dictionary. Contact submissions are validated with Zod and sent through a server-only Nodemailer integration, keeping SMTP credentials out of the browser.

## Getting Started

### Prerequisites

- Node.js 18 or newer
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

### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and visit a localized route such as `/en`, `/fr`, or `/pt`.

## Available Scripts

```bash
pnpm dev       # Start the development server
pnpm build     # Create a production build
pnpm start     # Start the production server
pnpm lint      # Run Next.js linting
```

## Localization

Translation files are stored in `messages/`:

- `messages/en.json` — English
- `messages/fr.json` — French
- `messages/pt.json` — Portuguese

The default locale is English, and all supported locales use a URL prefix.

## Deployment

The project is compatible with standard Next.js hosting platforms, including Vercel. Configure the required `NODEMAILER_*` environment variables in the deployment environment before enabling the contact form in production.

## License

No license file is currently included in this repository.
