import type { Dictionary } from "@/content";
import { Section, SectionHeader } from "@/components/ui/Section";

/**
 * Staggered editorial gallery. V1 uses tasteful gradient placeholders (no assets).
 * REPLACE: drop real photography in and swap the gradient <div> for <Image>.
 * See README → "Replacing placeholder media".
 */
const TILES = [
  "from-charcoal/80 to-olive/60 sm:row-span-2 sm:aspect-auto",
  "from-terracotta/60 to-champagne/50",
  "from-olive/70 to-charcoal/70",
  "from-champagne/60 to-terracotta/40",
  "from-charcoal/70 to-olive/50 sm:row-span-2 sm:aspect-auto",
  "from-olive/60 to-champagne/50",
];

export function Gallery({ dict }: { dict: Dictionary }) {
  const { gallery } = dict;
  return (
    <Section id="gallery" className="bg-cream-50">
      <SectionHeader kicker={gallery.kicker} title={gallery.title} intro={gallery.intro} />
      <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3">
        {gallery.tiles.map((tile, i) => (
          <figure
            key={tile.label}
            className={`relative flex items-end overflow-hidden rounded-2xl bg-gradient-to-br ${TILES[i % TILES.length]}`}
          >
            <figcaption className="relative z-10 p-4 text-sm font-medium text-cream drop-shadow">
              {tile.label}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-xs uppercase tracking-wide text-charcoal-muted">
        {gallery.placeholderNote}
      </p>
    </Section>
  );
}
