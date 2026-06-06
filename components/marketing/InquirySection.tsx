import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n/config";
import { Section } from "@/components/ui/Section";
import { InquiryForm } from "./InquiryForm";

export function InquirySection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { inquiry } = dict;
  return (
    <Section id="contact" className="bg-cream">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="kicker">{inquiry.kicker}</p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">{inquiry.title}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal-muted">{inquiry.intro}</p>
        </div>
        <InquiryForm dict={dict} locale={locale} />
      </div>
    </Section>
  );
}
