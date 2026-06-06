import { siteConfig } from "@/lib/config";

/**
 * Builds a wa.me deep link with an optional pre-filled message.
 * Number must be digits only (international format), handled in config.
 */
export function buildWhatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
