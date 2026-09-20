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
import { Toaster } from "@/components/ui/sonner";

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

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
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
      className="scroll-smooth focus-within:scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={cn(
          "bg-background text-foreground antialiased font-montserrat min-h-screen scroll-smooth",
          montserrat.variable,
          poppins.variable
        )}
      >
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
            <Toaster position="bottom-center" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
