export const locales = ["nl", "en"] as const;
export type Locale = (typeof locales)[number];

/** Dutch is the default and is served WITHOUT a URL prefix ("/"). English lives at "/en". */
export const defaultLocale: Locale = "nl";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Builds a localized href. Dutch (default) has no prefix; other locales are prefixed.
 * pass paths starting with "/" (e.g. "/#contact", "/").
 */
export function localizedHref(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean === "/" ? "/" : clean;
  // For anchor-only paths keep the hash on the locale root.
  if (clean.startsWith("/#")) return `/${locale}${clean.slice(1)}`;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

export const localeLabels: Record<Locale, string> = {
  nl: "NL",
  en: "EN",
};
