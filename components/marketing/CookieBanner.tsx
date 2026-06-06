"use client";

import { useState, useEffect } from "react";
import type { Dictionary } from "@/content";

const COOKIE_NAME = "cookie-consent";
const COOKIE_DAYS = 365;

function getConsentCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(^|;\\s*)" + COOKIE_NAME + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[2]) : null;
}

function setConsentCookie(value: "accepted" | "declined"): void {
  const expires = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString();
  document.cookie = `${COOKIE_NAME}=${value};expires=${expires};path=/;SameSite=Lax`;
}

function removeConsentCookie(): void {
  document.cookie = `${COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

interface Props {
  dict: Pick<Dictionary, "cookieBanner" | "footer">;
  privacyHref: string;
}

export function CookieBanner({ dict, privacyHref }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsentCookie()) setVisible(true);

    // CookieSettingsLink dispatches this event to reopen the banner.
    const handler = () => {
      removeConsentCookie();
      setVisible(true);
    };
    window.addEventListener("reopen-cookie-banner", handler);
    return () => window.removeEventListener("reopen-cookie-banner", handler);
  }, []);

  if (!visible) return null;

  function accept() {
    setConsentCookie("accepted");
    setVisible(false);
  }

  function decline() {
    setConsentCookie("declined");
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label={dict.cookieBanner.message}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-charcoal/10 bg-charcoal text-cream shadow-lg"
    >
      <div className="container-editorial flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-cream/80 sm:max-w-xl">
          {dict.cookieBanner.message}{" "}
          <a
            href={privacyHref}
            className="underline hover:text-cream transition-colors"
          >
            {dict.cookieBanner.privacyLabel}
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={decline}
            className="rounded-full border border-cream/30 px-5 py-2 text-sm text-cream/70 transition-colors hover:border-cream/60 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            {dict.cookieBanner.decline}
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-olive px-5 py-2 text-sm text-cream transition-colors hover:bg-olive/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            {dict.cookieBanner.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
