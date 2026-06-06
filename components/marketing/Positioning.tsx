import type { Dictionary } from "@/content";
import { Section } from "@/components/ui/Section";

export function Positioning({ dict }: { dict: Dictionary }) {
  const { positioning } = dict;
  return (
    <Section id="services" className="bg-cream">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="kicker">{positioning.kicker}</p>
          <h2 className="mt-4 text-3xl leading-tight md:text-5xl">{positioning.title}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal-muted">
            {positioning.intro}
          </p>
        </div>
        <ul className="divide-y divide-charcoal/10 border-t border-charcoal/10">
          {positioning.pillars.map((pillar, i) => (
            <li key={pillar.title} className="flex gap-6 py-7">
              <span className="font-serif text-2xl text-olive/70 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl text-charcoal">{pillar.title}</h3>
                <p className="mt-2 leading-relaxed text-charcoal-muted">{pillar.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
