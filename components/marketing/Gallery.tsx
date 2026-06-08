import Image from "next/image";
import type { Dictionary } from "@/content";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GALLERY_IMAGES } from "@/lib/gallery-images";
import { cn } from "@/lib/utils";

/** Editorial masonry: tiles 0 and 4 span two rows on sm+. */
const TILE_LAYOUT = [
  "sm:row-span-2 sm:aspect-auto",
  "",
  "",
  "",
  "sm:row-span-2 sm:aspect-auto",
  "",
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
            className={cn(
              "relative flex min-h-[200px] items-end overflow-hidden rounded-2xl bg-charcoal/10",
              TILE_LAYOUT[i],
            )}
          >
            <Image
              src={GALLERY_IMAGES[i]}
              alt={tile.label}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
              className="object-cover transition-transform duration-700 ease-editorial hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/15 to-transparent"
              aria-hidden="true"
            />
            <figcaption className="relative z-10 p-4 text-sm font-medium text-cream drop-shadow">
              {tile.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
