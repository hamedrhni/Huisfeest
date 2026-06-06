"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { localeLabels, locales, type Locale } from "@/lib/i18n/config";

/**
 * Swaps the locale while preserving the current path.
 * Dutch (default) has no prefix; English is prefixed with /en.
 */
export function LocaleToggle({ current }: { current: Locale }) {
  const pathname = usePathname() || "/";

  // Strip any /en prefix to get the canonical (Dutch) base path.
  const base = pathname.replace(/^\/en(?=\/|$)/, "") || "/";

  const hrefFor = (locale: Locale): string => {
    if (locale === "nl") return base;
    return base === "/" ? "/en" : `/en${base}`;
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && <span className="px-1 text-charcoal/30">/</span>}
          <Link
            href={hrefFor(locale)}
            aria-current={current === locale ? "true" : undefined}
            className={cn(
              "rounded px-1 transition-colors",
              current === locale
                ? "font-semibold text-charcoal"
                : "text-charcoal-muted hover:text-charcoal",
            )}
          >
            {localeLabels[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
