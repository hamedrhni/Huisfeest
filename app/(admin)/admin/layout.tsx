import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HuisFeest · Beheer",
  // Internal tool — keep it out of search engines.
  robots: { index: false, follow: false },
};

/**
 * Separate ROOT layout for the admin area (not localized). Renders its own
 * <html>/<body>. This works alongside the marketing root layout because the
 * project uses multiple root layouts (no shared app/layout.tsx).
 */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream-50 text-charcoal font-sans antialiased">{children}</body>
    </html>
  );
}
