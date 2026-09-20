import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";

import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales, routing } from "@/i18n-config";
import { cn } from "@/lib/utils";
import "../globals.css";
import { Footer } from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Mognu's Company",
  description:
    "Nous sommes Mognu's, une entreprise de charpenterie spécialisée dans la création de meubles sur mesure.",
  keywords: [
    "Carpintaria personalizada",
    "Móveis de madeira sob medida",
    "Técnicas de marcenaria",
    "Móveis artesanais",
    "Design de interiores em madeira",
    "Menuiserie sur mesure",
    "Meubles en bois personnalisés",
    "Techniques de menuiserie",
    "Meubles artisanaux",
    "Design d'intérieur en bois",
  ],
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
  openGraph: {
    title: "Mognu's",
    description:
      "Nous sommes Mognu's, une entreprise de charpenterie spécialisée dans la création de meubles sur mesure.",
    url: "https://mognuscompany.com",
    images: "https://mognuscompany.com/mognus-opgraph.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mognu's",
    description:
      "Nous sommes Mognu's, une entreprise de charpenterie spécialisée dans la création de meubles sur mesure.",
    site: "https://mognuscompany.com",
    images: "https://mognuscompany.com/mognus-opgraph.jpg",
  },
};

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

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
        <NextIntlClientProvider messages={messages}>
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
