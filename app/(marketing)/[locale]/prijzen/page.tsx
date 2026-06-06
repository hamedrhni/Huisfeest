import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/content";
import { isLocale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "nl");
  return {
    title: dict.pricingPage.meta.title,
    description: dict.pricingPage.meta.description,
  };
}

export default async function PrijzenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const page = dict.pricingPage;
  const prefix = locale === "nl" ? "" : `/${locale}`;

  return (
    <div className="container-editorial py-24">
      {/* Header */}
      <div className="mx-auto max-w-2xl mb-16">
        <p className="text-xs uppercase tracking-kicker text-olive mb-4">
          {locale === "nl" ? "Wat kost het?" : "What does it cost?"}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">{page.title}</h1>
        <p className="text-charcoal/70 leading-relaxed text-lg">{page.intro}</p>
      </div>

      {/* Package cards */}
      <div className="grid gap-8 md:grid-cols-2 mb-20">
        {page.packages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex flex-col rounded-2xl border border-charcoal/10 bg-cream-50 p-8"
          >
            <p className="text-xs uppercase tracking-kicker text-olive mb-1">{pkg.audience}</p>
            <h2 className="font-serif text-2xl text-charcoal mb-1">{pkg.name}</h2>
            <p className="text-charcoal/60 text-sm mb-4">{pkg.tagline}</p>

            {/* Indicative price */}
            <p className="font-serif text-xl text-olive mb-6">
              {pkg.range.startsWith("TODO:")
                ? locale === "nl"
                  ? "Prijs op aanvraag"
                  : "Price on request"
                : pkg.range}
            </p>

            <ul className="space-y-2 mb-8 text-sm text-charcoal/70">
              {pkg.includes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-olive shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <Link
                href={`${prefix}/#contact`}
                className="inline-flex items-center gap-2 rounded-full bg-olive px-6 py-2.5 text-sm text-cream hover:bg-olive/80 transition-colors"
              >
                {pkg.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Price disclaimer */}
      <p className="mx-auto max-w-2xl text-xs text-charcoal/50 text-center mb-20">
        {page.priceDisclaimer}
      </p>

      {/* FAQ */}
      <div className="mx-auto max-w-2xl mb-20">
        <h2 className="font-serif text-2xl text-charcoal mb-8">{page.faqTitle}</h2>
        <div className="space-y-6">
          {page.faq.map((item) => (
            <div key={item.q} className="border-b border-charcoal/10 pb-6">
              <h3 className="font-medium text-charcoal mb-2">{item.q}</h3>
              <p className="text-charcoal/70 leading-relaxed text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-xl text-center rounded-2xl bg-charcoal p-12">
        <h2 className="font-serif text-2xl text-cream mb-3">{page.ctaTitle}</h2>
        <p className="text-cream/70 mb-8">{page.ctaBody}</p>
        <Link
          href={`${prefix}/#contact`}
          className="inline-flex items-center gap-2 rounded-full bg-olive px-8 py-3 text-cream hover:bg-olive/80 transition-colors"
        >
          {page.ctaButton}
        </Link>
      </div>
    </div>
  );
}
