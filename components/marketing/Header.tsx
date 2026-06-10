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

  const solid = scrolled || menuOpen;

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
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-editorial",
        solid
          ? "bg-cream/95 shadow-[0_1px_0_rgba(33,29,24,0.08)] backdrop-blur"
          : "bg-transparent",
      )}
      style={{ height: "var(--header-h)" }}
    >
      <div className="container-editorial flex h-[var(--header-h)] items-center justify-between gap-4">
        {/* Logo — white on hero, olive on scroll */}
        <Link href={homeHref} className="flex items-center gap-2" aria-label={dict.meta.title}>
          <Logo
            className={cn(
              "h-8 w-auto transition-colors duration-500",
              solid ? "text-olive" : "text-cream",
            )}
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                solid
                  ? "text-charcoal-soft hover:text-olive"
                  : "text-cream/90 hover:text-white",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <LocaleToggle current={locale} solid={solid} />
          <a
            href={buildWhatsappLink(dict.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              solid
                ? "text-charcoal hover:bg-charcoal/5"
                : "text-cream/90 hover:text-white",
            )}
          >
            {dict.nav.whatsappCta}
          </a>
          <a
            href="#contact"
            className={cn(
              "rounded-full px-6 py-2.5 text-sm font-medium transition-colors",
              solid
                ? "bg-olive text-cream hover:bg-olive-dark"
                : "bg-cream text-charcoal hover:bg-white",
            )}
          >
            {dict.nav.requestCta}
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className={cn(
            "rounded-lg p-2 transition-colors lg:hidden",
            solid
              ? "text-charcoal hover:bg-charcoal/5"
              : "text-cream hover:text-white",
          )}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? dict.nav.closeLabel : dict.nav.menuLabel}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile dropdown menu — always solid background */}
      {menuOpen && (
        <div className="border-t border-charcoal/10 bg-cream shadow-lg lg:hidden">
          <div className="container-editorial flex flex-col gap-1 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-charcoal-soft hover:bg-charcoal/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-charcoal/10 pt-4">
              <LocaleToggle current={locale} solid />
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
