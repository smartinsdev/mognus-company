import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";

import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { locales, routing } from "@/i18n-config";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import "../globals.css";
import { Footer } from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Was `export const metadata`, a static object. A static export cannot read
// `params`, so every locale served the same French title, description and
// social card — verifiable in the old build output, where /en and /pt both
// carried "Nous sommes Mognu's...".
//
// Only what is genuinely shared across the four pages lives here. Anything
// that identifies a specific page — canonical, hreflang, Open Graph — is built
// per page by `pageMetadata`, because metadata merges shallowly and a single
// `alternates` here would give the policy pages the homepage's canonical.
export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  // generateMetadata resolves before the layout body runs, so it sees invalid
  // locales too. Falling back keeps next-intl's message loader from throwing
  // on a path the layout is about to answer with a 404 anyway.
  const active = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({ locale: active, namespace: "Meta" });

  return {
    // Lets every URL-bearing field below, and in pageMetadata, be written as a
    // path instead of repeating the host.
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      // Applies to any page that sets a plain string title — the three policy
      // pages. The homepage sets none and keeps `default` as-is.
      template: `%s | ${SITE_NAME}`,
    },
    description: t("description"),
    // One comma-separated string per catalogue so translators edit prose, not
    // a JSON array.
    keywords: t("keywords")
      .split(",")
      .map((keyword) => keyword.trim()),
    authors: {
      name: "Sinval Martins",
      url: "https://github.com/smartinsdev",
    },
    icons: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
    ],
    manifest: "/site.webmanifest",
  };
}

// The CSS variables are suffixed because Tailwind v4 derives the
// `font-montserrat` utility from a `--font-montserrat` theme token. Reusing
// the same name here would make that token reference itself.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat-sans",
});

// Only the three weights the markup actually asks for. Poppins is used on
// headings and the desktop nav: 400 (NavLinks, which sets no weight), 700
// (ServiceCard's h3) and 800 (every font-extrabold heading). The other five
// weights were each emitting a render-blocking <link rel="preload"> on every
// page for a face nothing rendered.
const poppins = Poppins({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins-sans",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  // Only the namespaces a Client Component actually reads: `Index.nav` for
  // MenuMobile, `Index.contact` for ContactForm and `SwitchLang` for
  // SwitcherLang. useTranslations resolves against the request config in a
  // Server Component and never touches this provider, so handing it the whole
  // catalogue serialized every string into every page's flight payload —
  // including the 5.5KB of policy prose under `terms`, verifiable by grepping
  // the prerendered homepage for it.
  const clientMessages = {
    Index: {
      nav: messages.Index.nav,
      contact: messages.Index.contact,
    },
    SwitchLang: messages.SwitchLang,
  };

  return (
    <html
      lang={locale}
      className={cn(
        "scroll-smooth focus-within:scroll-smooth",
        // The font variables live on <html> so they are defined on :root, where
        // Tailwind v4's @theme tokens reference them. On <body> they would be
        // out of scope: :root would compute --font-montserrat as invalid and
        // <body> would inherit that computed value rather than re-resolving it.
        montserrat.variable,
        poppins.variable
      )}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased font-montserrat min-h-screen scroll-smooth">
        <NextIntlClientProvider messages={clientMessages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
