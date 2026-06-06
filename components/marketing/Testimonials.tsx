import type { Dictionary } from "@/content";
import { Section, SectionHeader } from "@/components/ui/Section";

/**
 * Testimonials: reusable structure with CLEARLY-MARKED placeholder content.
 * Per project rules, do NOT fabricate real reviews — replace these once genuine
 * guest feedback exists.
 */
export function Testimonials({ dict }: { dict: Dictionary }) {
  const { testimonials } = dict;
  return (
    <Section className="bg-cream">
      <SectionHeader kicker={testimonials.kicker} title={testimonials.title} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.items.map((item, i) => (
          <figure
            key={i}
            className="relative flex flex-col rounded-2xl border border-dashed border-charcoal/20 bg-cream-50 p-7"
          >
            <span className="absolute right-5 top-3 font-serif text-5xl leading-none text-olive/20" aria-hidden="true">
              &rdquo;
            </span>
            <blockquote className="relative leading-relaxed text-charcoal-soft">
              {item.quote}
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-medium text-charcoal">{item.name}</span>
              <span className="block text-charcoal-muted">{item.context}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-xs uppercase tracking-wide text-charcoal-muted">
        {testimonials.placeholderNote}
      </p>
    </Section>
  );
}
