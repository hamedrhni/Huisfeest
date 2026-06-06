import type { Dictionary } from "@/content";
import { isWhatsappPlaceholder } from "@/lib/config";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { Logo } from "./Logo";

export function ComingSoon({ dict }: { dict: Dictionary }) {
  const whatsappHref = buildWhatsappLink(dict.whatsapp.defaultMessage);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <Logo className="mb-8 h-10 w-auto text-charcoal" />

      <h1 className="font-serif text-3xl text-charcoal sm:text-4xl">
        {dict.comingSoon.title}
      </h1>

      <p className="mt-4 max-w-sm text-charcoal/60">{dict.comingSoon.tagline}</p>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-olive px-8 py-3 text-cream transition-colors hover:bg-olive/80"
      >
        {dict.comingSoon.whatsappCta}
      </a>

      {isWhatsappPlaceholder && (
        <p className="mt-4 text-xs text-charcoal/30">{dict.whatsapp.placeholderWarning}</p>
      )}
    </div>
  );
}
