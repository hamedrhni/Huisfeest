import type { Dictionary } from "@/content";
import { Section, SectionHeader } from "@/components/ui/Section";

/**
 * Native <details>/<summary> accordion — accessible and works without JS.
 */
export function Faq({ dict }: { dict: Dictionary }) {
  const { faq } = dict;
  return (
    <Section id="faq" className="bg-cream-50">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader kicker={faq.kicker} title={faq.title} />
        </div>
        <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
          {faq.items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg text-charcoal marker:content-none">
                {item.q}
                <span className="shrink-0 text-olive transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-prose leading-relaxed text-charcoal-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
