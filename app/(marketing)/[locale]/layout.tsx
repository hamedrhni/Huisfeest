import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { getDictionary } from "@/content";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/config";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { WhatsappFab } from "@/components/marketing/WhatsappFab";
import { CookieBanner } from "@/components/marketing/CookieBanner";
import { ComingSoon } from "@/components/marketing/ComingSoon";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "nl");

  // Maintenance mode: noindex, minimal title, no OG tags
  if (siteConfig.maintenanceMode) {
    return {
      title: dict.comingSoon.metaTitle,
      robots: { index: false, follow: false },
    };
  }

  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: {
        nl: "/",
        en: "/en",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      locale: locale === "en" ? "en_US" : "nl_NL",
      siteName: siteConfig.name,
    },
  };
}

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  // Maintenance / soft-launch mode: show coming soon for all public routes.
  // /admin has its own layout and is never affected by this check.
  if (siteConfig.maintenanceMode) {
    return (
      <html lang={typedLocale} className={`${playfair.variable} ${inter.variable}`}>
        <body className="min-h-screen bg-cream text-charcoal">
          <ComingSoon dict={dict} />
        </body>
      </html>
    );
  }

  return (
    <html lang={typedLocale} className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream text-charcoal">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-olive focus:px-4 focus:py-2 focus:text-cream"
        >
          {typedLocale === "en" ? "Skip to content" : "Naar inhoud"}
        </a>
        <Header locale={typedLocale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={typedLocale} dict={dict} />
        <WhatsappFab dict={dict} />
        <CookieBanner
          dict={dict}
          privacyHref={typedLocale === "nl" ? "/privacy" : "/en/privacy"}
        />
      </body>
    </html>
  );
}
