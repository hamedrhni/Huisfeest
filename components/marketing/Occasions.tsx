import type { Dictionary } from "@/content";
import { Section, SectionHeader } from "@/components/ui/Section";

const TILE_GRADIENTS = [
  "from-olive/20 to-champagne/30",
  "from-terracotta/20 to-champagne/20",
  "from-champagne/30 to-olive/15",
  "from-olive/15 to-terracotta/20",
  "from-champagne/25 to-olive/20",
  "from-terracotta/15 to-champagne/30",
];

export function Occasions({ dict }: { dict: Dictionary }) {
  const { occasions } = dict;
  return (
    <Section id="occasions" className="bg-cream-50">
      <SectionHeader kicker={occasions.kicker} title={occasions.title} intro={occasions.intro} />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {occasions.items.map((item, i) => (
          <article
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-charcoal/10 bg-cream p-7 transition-shadow duration-500 ease-editorial hover:shadow-[0_18px_40px_-24px_rgba(33,29,24,0.45)]"
          >
            <div
              className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${
                TILE_GRADIENTS[i % TILE_GRADIENTS.length]
              } blur-2xl transition-transform duration-700 group-hover:scale-125`}
              aria-hidden="true"
            />
            <h3 className="relative text-xl text-charcoal">{item.title}</h3>
            <p className="relative mt-2 leading-relaxed text-charcoal-muted">{item.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
