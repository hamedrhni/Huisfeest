"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content";
import { HERO_CHAPTER_IMAGES } from "@/lib/hero-images";
import { cn } from "@/lib/utils";

/**
 * Cinematic scroll hero — one photo per chapter (4 images in public/hero/).
 * As the visitor scrolls, the background crossfades between chapter photos
 * in sync with the chapter text overlays.
 *
 * Respects prefers-reduced-motion: static first chapter image, all copy visible.
 */
export function CinematicHero({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const chapters = dict.hero.chapters;
  const activeIndex = Math.min(
    chapters.length - 1,
    Math.floor(progress * chapters.length),
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  const chapterImages = HERO_CHAPTER_IMAGES.slice(0, chapters.length);

  // ---- Reduced-motion: static hero with first chapter image ----------------
  if (reducedMotion) {
    return (
      <section className="relative flex min-h-screen items-center overflow-hidden bg-charcoal">
        <Image
          src={chapterImages[0]}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/40" aria-hidden="true" />
        <div className="container-editorial relative z-10 py-32 text-cream">
          <p className="kicker text-champagne">{chapters[0].kicker}</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">{chapters[0].title}</h1>
          <p className="mt-6 max-w-xl text-lg text-cream/80">{chapters[0].body}</p>
          <ul className="mt-10 max-w-xl space-y-3 border-l border-champagne/40 pl-5">
            {chapters.slice(1).map((c) => (
              <li key={c.kicker} className="text-cream/75">
                <span className="block text-xs uppercase tracking-kicker text-champagne/80">
                  {c.kicker}
                </span>
                {c.title}
              </li>
            ))}
          </ul>
          <a href="#services" className="btn-primary mt-10 bg-champagne text-charcoal hover:bg-champagne-soft">
            {dict.hero.enter}
          </a>
        </div>
      </section>
    );
  }

  // ---- Motion: sticky section, chapter photos crossfade on scroll ----------
  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-charcoal">
      <div className="relative sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Chapter backgrounds */}
        {chapterImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            aria-hidden="true"
            className={cn(
              "object-cover transition-opacity duration-700 ease-editorial",
              i === activeIndex ? "opacity-100" : "opacity-0",
            )}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-charcoal/30" aria-hidden="true" />

        {/* Chapter text */}
        <div className="container-editorial relative z-10 text-cream">
          <div className="relative h-[60vh] max-w-3xl">
            {chapters.map((chapter, i) => (
              <div
                key={chapter.kicker}
                aria-hidden={i !== activeIndex}
                className={cn(
                  "absolute inset-x-0 top-1/2 -translate-y-1/2 transition-opacity duration-700 ease-editorial",
                  i === activeIndex ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <p className="kicker text-champagne">{chapter.kicker}</p>
                <h1 className="mt-4 text-4xl leading-tight md:text-6xl">{chapter.title}</h1>
                <p className="mt-6 max-w-xl text-lg text-cream/85">{chapter.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-cream/70 transition-opacity duration-500"
          style={{ opacity: progress < 0.04 ? 1 : 0 }}
        >
          <span className="text-xs uppercase tracking-kicker">{dict.hero.scrollHint}</span>
          <span className="h-8 w-px animate-pulse bg-cream/50" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
