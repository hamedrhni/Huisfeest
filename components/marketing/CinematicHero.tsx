"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content";
import { HERO_CHAPTER_IMAGES } from "@/lib/hero-images";
import { cn } from "@/lib/utils";

/**
 * Cinematic hero — each chapter is a full-viewport section with its own
 * background image, stacked vertically. No sticky positioning, no scroll
 * math for images — works reliably on every mobile browser including
 * iOS Safari & Chrome on iPhone.
 *
 * An IntersectionObserver tracks which chapter is in view to drive the
 * progress dots. Each chapter fades in as it enters the viewport.
 */
export function CinematicHero({ dict }: { dict: Dictionary }) {
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set([0]));

  const chapters = dict.hero.chapters;
  const chapterCount = chapters.length;
  const chapterImages = HERO_CHAPTER_IMAGES.slice(0, chapterCount);

  useEffect(() => {
    const refs = chapterRefs.current.filter(Boolean) as HTMLDivElement[];
    if (refs.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = -1;
        let bestRatio = -1;

        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-index"));
          if (Number.isNaN(idx)) return;

          setVisibleSet((prev) => {
            const next = new Set(prev);
            if (entry.isIntersecting) next.add(idx);
            return next;
          });

          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestIdx = idx;
            bestRatio = entry.intersectionRatio;
          }
        });

        if (bestIdx >= 0) setActiveIndex(bestIdx);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    refs.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero">
      {chapters.map((chapter, i) => (
        <div
          key={chapter.kicker}
          ref={(el) => {
            chapterRefs.current[i] = el;
          }}
          data-index={i}
          className="relative flex min-h-screen items-end bg-charcoal sm:items-center"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={chapterImages[i]}
              alt=""
              fill
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              sizes="100vw"
              quality={80}
              className="object-cover"
            />
          </div>

          {/* Readability scrim */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/20"
            aria-hidden="true"
          />

          {/* Chapter text */}
          <div
            className={cn(
              "container-editorial relative z-10 pb-28 pt-32 text-cream sm:pb-32 sm:pt-24",
              "transition-all duration-700 ease-out",
              visibleSet.has(i)
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0",
            )}
          >
            <p className="kicker text-champagne">{chapter.kicker}</p>
            <h1 className="mt-3 max-w-3xl text-3xl leading-tight sm:mt-4 sm:text-4xl md:text-6xl">
              {chapter.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85 sm:mt-6 sm:text-lg">
              {chapter.body}
            </p>
          </div>

          {/* Scroll hint (only on first chapter) */}
          {i === 0 && (
            <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 sm:bottom-8">
              <div className="flex items-center gap-2" aria-hidden="true">
                {chapters.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      dotIdx === activeIndex
                        ? "w-6 bg-champagne"
                        : "w-1.5 bg-cream/40",
                    )}
                  />
                ))}
              </div>
              <span className="text-xs uppercase tracking-kicker text-cream/70">
                {dict.hero.scrollHint}
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Fixed chapter dots — visible while scrolling through hero */}
      <ChapterDots
        count={chapterCount}
        activeIndex={activeIndex}
        heroRef={chapterRefs}
      />
    </section>
  );
}

/**
 * Floating dots indicator fixed to the right side of the screen.
 * Only visible while the hero section is in the viewport.
 */
function ChapterDots({
  count,
  activeIndex,
  heroRef,
}: {
  count: number;
  activeIndex: number;
  heroRef: React.RefObject<(HTMLDivElement | null)[]>;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const refs = heroRef.current;
      if (!refs) return;

      const first = refs[0];
      const last = refs[refs.length - 1];
      if (!first || !last) return;

      const topRect = first.getBoundingClientRect();
      const bottomRect = last.getBoundingClientRect();
      const inView = topRect.top < window.innerHeight && bottomRect.bottom > 0;
      setVisible(inView);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [heroRef]);

  if (!visible) return null;

  return (
    <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2 sm:right-6">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "rounded-full transition-all duration-500",
            i === activeIndex
              ? "h-6 w-1.5 bg-champagne"
              : "h-1.5 w-1.5 bg-cream/40",
          )}
        />
      ))}
    </div>
  );
}
