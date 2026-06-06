import type { Locale } from "@/lib/i18n/config";
import { nl, type Dictionary } from "./nl";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { nl, en };

/** Returns the full content dictionary for a locale. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? nl;
}

export type { Dictionary };
