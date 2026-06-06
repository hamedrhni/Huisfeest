import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    title: dict.privacyPage.meta.title,
    description: dict.privacyPage.meta.description,
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const page = dict.privacyPage;

  return (
    <div className="container-editorial py-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-kicker text-olive mb-4">
          {locale === "nl" ? "Beleid" : "Policy"}
        </p>
        <h1 className="font-serif text-4xl text-charcoal mb-2">{page.title}</h1>
        <p className="text-sm text-charcoal/50 mb-10">
          {locale === "nl" ? "Laatst bijgewerkt" : "Last updated"}: {page.lastUpdated}
        </p>
        <p className="text-charcoal/80 leading-relaxed mb-10">{page.intro}</p>
        <div className="space-y-8">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-xl text-charcoal mb-2">{section.heading}</h2>
              <p className="text-charcoal/70 leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
