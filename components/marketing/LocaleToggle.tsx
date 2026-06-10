"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { localeLabels, locales, type Locale } from "@/lib/i18n/config";

/**
 * Swaps the locale while preserving the current path.
 * Dutch (default) has no prefix; English is prefixed with /en.
 *
 * @param solid — true when header has a solid cream background (scrolled / menu open).
 *                false when header is transparent over the hero images.
 */
export function LocaleToggle({ current, solid = true }: { current: Locale; solid?: boolean }) {
  const pathname = usePathname() || "/";

  const base = pathname.replace(/^\/en(?=\/|$)/, "") || "/";

  const hrefFor = (locale: Locale): string => {
    if (locale === "nl") return base;
    return base === "/" ? "/en" : `/en${base}`;
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && (
            <span className={cn("px-1", solid ? "text-charcoal/30" : "text-cream/40")}>
              /
            </span>
          )}
          <Link
            href={hrefFor(locale)}
            aria-current={current === locale ? "true" : undefined}
            className={cn(
              "rounded px-1 transition-colors",
              current === locale
                ? solid
                  ? "font-semibold text-charcoal"
                  : "font-semibold text-white"
                : solid
                  ? "text-charcoal-muted hover:text-charcoal"
                  : "text-cream/70 hover:text-white",
            )}
          >
            {localeLabels[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
