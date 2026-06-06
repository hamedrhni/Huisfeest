import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/config";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { CookieSettingsLink } from "./CookieSettingsLink";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const prefix = locale === "nl" ? "" : `/${locale}`;
  const privacyHref = `${prefix}/privacy`;
  const termsHref = `${prefix}/voorwaarden`;
  const exploreLinks = [
    { href: "#services", label: dict.nav.services },
    { href: "#packages", label: dict.nav.packages },
    { href: "#how", label: dict.nav.how },
    { href: "#faq", label: dict.nav.faq },
  ];

  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="container-editorial grid gap-10 py-16 md:grid-cols-3">
        <div>
          <Logo className="h-9 w-auto text-champagne" />
          <p className="mt-4 max-w-xs font-serif text-xl text-cream">{dict.footer.tagline}</p>
          <p className="mt-4 text-sm text-cream/60">{dict.footer.serviceAreaLine}</p>
        </div>

        <nav aria-label="footer">
          <h3 className="text-sm uppercase tracking-kicker text-champagne">{dict.footer.explore}</h3>
          <ul className="mt-4 space-y-2">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-cream/70 transition-colors hover:text-cream">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm uppercase tracking-kicker text-champagne">{dict.footer.contactTitle}</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href={buildWhatsappLink(dict.whatsapp.defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 transition-colors hover:text-cream"
              >
                {dict.nav.whatsappCta}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="text-cream/70 transition-colors hover:text-cream">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href="#contact" className="text-cream/70 transition-colors hover:text-cream">
                {dict.nav.requestCta}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-editorial flex flex-col gap-2 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <a href={privacyHref} className="hover:text-cream/80 transition-colors">
              {dict.footer.privacy}
            </a>
            <a href={termsHref} className="hover:text-cream/80 transition-colors">
              {dict.footer.terms}
            </a>
            <CookieSettingsLink
              label={dict.footer.cookieSettings}
              className="hover:text-cream/80 transition-colors"
            />
            <span className="rounded-full bg-cream/10 px-2 py-0.5">{dict.footer.placeholderTag}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
