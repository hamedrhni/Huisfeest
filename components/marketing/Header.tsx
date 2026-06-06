"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n/config";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { LocaleToggle } from "./LocaleToggle";
import { Logo } from "./Logo";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: dict.nav.services },
    { href: "#occasions", label: dict.nav.occasions },
    { href: "#packages", label: dict.nav.packages },
    { href: "#how", label: dict.nav.how },
    { href: "#faq", label: dict.nav.faq },
  ];

  const homeHref = locale === "nl" ? "/" : "/en";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial",
        scrolled || menuOpen
          ? "bg-cream/95 shadow-[0_1px_0_rgba(33,29,24,0.08)] backdrop-blur"
          : "bg-transparent",
      )}
      style={{ height: "var(--header-h)" }}
    >
      <div className="container-editorial flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href={homeHref} className="flex items-center gap-2" aria-label={dict.meta.title}>
          <Logo className="h-8 w-auto text-olive" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-charcoal-soft transition-colors hover:text-olive"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LocaleToggle current={locale} />
          <a
            href={buildWhatsappLink(dict.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-sm"
          >
            {dict.nav.whatsappCta}
          </a>
          <a href="#contact" className="btn-primary text-sm">
            {dict.nav.requestCta}
          </a>
        </div>

        <button
          type="button"
          className="btn-ghost lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? dict.nav.closeLabel : dict.nav.menuLabel}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-charcoal/10 bg-cream/98 backdrop-blur lg:hidden">
          <div className="container-editorial flex flex-col gap-1 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-3 text-base text-charcoal-soft hover:bg-charcoal/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-charcoal/10 pt-4">
              <LocaleToggle current={locale} />
              <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary text-sm">
                {dict.nav.requestCta}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
