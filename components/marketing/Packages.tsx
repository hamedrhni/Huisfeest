import type { Dictionary } from "@/content";
import { Section, SectionHeader } from "@/components/ui/Section";

export function Packages({ dict }: { dict: Dictionary }) {
  const { packages } = dict;
  return (
    <Section id="packages" className="bg-cream">
      <SectionHeader kicker={packages.kicker} title={packages.title} intro={packages.intro} />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {packages.items.map((pkg, i) => (
          <article
            key={pkg.id}
            className="flex flex-col rounded-3xl border border-charcoal/10 bg-cream-50 p-8 transition-colors duration-500 hover:border-olive/40"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-serif text-sm text-olive/70 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full bg-charcoal/5 px-3 py-1 text-xs text-charcoal-muted">
                {pkg.audience}
              </span>
            </div>
            <h3 className="mt-4 text-2xl text-charcoal">{pkg.name}</h3>
            <p className="mt-1 italic text-charcoal-muted">{pkg.tagline}</p>
            <ul className="mt-6 space-y-2.5 border-t border-charcoal/10 pt-6">
              {pkg.includes.map((inc) => (
                <li key={inc} className="flex gap-3 text-charcoal-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" aria-hidden="true" />
                  {inc}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-secondary mt-8 self-start">
              {packages.cta}
            </a>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-charcoal-muted">{packages.priceNote}</p>
    </Section>
  );
}
