"use client";

import type { Dictionary } from "@/content";
import { buildWhatsappLink } from "@/lib/whatsapp";

/**
 * Sticky WhatsApp CTA. Prominent on mobile (label + icon), compact on desktop.
 * Number is configured in lib/config.ts (NEXT_PUBLIC_WHATSAPP_NUMBER).
 */
export function WhatsappFab({ dict }: { dict: Dictionary }) {
  return (
    <a
      href={buildWhatsappLink(dict.whatsapp.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.whatsapp.fabLabel}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-charcoal/20 transition-transform duration-300 ease-editorial hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <WhatsappIcon />
      <span className="hidden sm:inline">{dict.whatsapp.fabLabel}</span>
    </a>
  );
}

function WhatsappIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.821 11.821 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.87 9.87 0 001.519 5.26l-.999 3.648 3.97-1.039a9.86 9.86 0 00.999.532z" />
      <path d="M9.5 6.9c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.1 0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3-.3-.2-1.5-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.6.9-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.7-.6-1.2-1.4-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.5-1.3-.7-1.8z" />
    </svg>
  );
}
