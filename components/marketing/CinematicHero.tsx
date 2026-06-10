"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content";
import { HERO_CHAPTER_IMAGES } from "@/lib/hero-images";
import { cn } from "@/lib/utils";

/**
 * Cinematic scroll hero — one photo per chapter (4 images in public/hero/).
 * Background crossfades in sync with chapter text as the visitor scrolls.
 *
 * Mobile fixes:
 * - Uses `vh` (universal) instead of `dvh` (limited support)
 * - Uses native <img> with object-fit instead of Next Image `fill` (avoids
 *   parent-height issues in sticky contexts on mobile Safari)
 * - Explicit inline height on the scroll-track section
 * - Touch + scroll listeners for iOS
 */
export function CinematicHero({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const chapters = dict.hero.chapters;
  const chapterCount = chapters.length;
  const chapterImages = HERO_CHAPTER_IMAGES.slice(0, chapterCount);

  const updateFromScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionH = section.offsetHeight;
    const viewH = window.innerHeight;
    const scrollable = sectionH - viewH;

    if (scrollable <= 0) {
      setProgress(0);
      setActiveIndex(0);
      return;
    }

    const p = Math.min(1, Math.max(0, -rect.top / scrollable));
    setProgress(p);
    setActiveIndex(Math.min(chapterCount - 1, Math.floor(p * chapterCount)));
  }, [chapterCount]);

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
    const tick = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateFromScroll();
      });
    };

    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("touchmove", tick, { passive: true });
    window.addEventListener("resize", tick, { passive: true });

    tick();

    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("touchmove", tick);
      window.removeEventListener("resize", tick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion, updateFromScroll]);

  // ---- Reduced motion: static hero with all chapter text visible ----------
  if (reducedMotion) {
    return (
      <section className="relative flex min-h-screen items-center overflow-hidden bg-charcoal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={chapterImages[0]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/40" />
        <div className="container-editorial relative z-10 py-32 text-cream">
          <p className="kicker text-champagne">{chapters[0].kicker}</p>
          <h1 className="mt-4 max-w-3xl text-3xl leading-tight sm:text-4xl md:text-6xl">
            {chapters[0].title}
          </h1>
          <p className="mt-6 max-w-xl text-base text-cream/80 sm:text-lg">
            {chapters[0].body}
          </p>
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
          <a
            href="#services"
            className="btn-primary mt-10 bg-champagne text-charcoal hover:bg-champagne-soft"
          >
            {dict.hero.enter}
          </a>
        </div>
      </section>
    );
  }

  // ---- Scroll hero: sticky panel with crossfading chapter backgrounds ------
  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal"
      // 400vh via inline style — guaranteed to work on every browser.
      style={{ height: `${chapterCount * 100}vh` }}
    >
      <div
        className="sticky top-0 w-full"
        style={{ height: "100vh" }}
      >
        {/* Background images — all stacked, opacity toggled */}
        {chapterImages.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            // Inline styles to guarantee full-cover on every mobile browser.
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: i === activeIndex ? 1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        ))}

        {/* Readability scrim */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-charcoal/30"
          aria-hidden="true"
        />

        {/* Chapter text overlays */}
        <div className="container-editorial relative z-10 flex items-center" style={{ height: "100vh" }}>
          <div className="w-full max-w-3xl">
            {chapters.map((chapter, i) => (
              <div
                key={chapter.kicker}
                aria-hidden={i !== activeIndex}
                style={{
                  position: i === activeIndex ? "relative" : "absolute",
                  top: i === activeIndex ? undefined : 0,
                  left: i === activeIndex ? undefined : 0,
                  opacity: i === activeIndex ? 1 : 0,
                  pointerEvents: i === activeIndex ? "auto" : "none",
                  transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <p className="kicker text-champagne">{chapter.kicker}</p>
                <h1 className="mt-3 text-3xl leading-tight sm:mt-4 sm:text-4xl md:text-6xl text-cream">
                  {chapter.title}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85 sm:mt-6 sm:text-lg">
                  {chapter.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chapter progress dots + scroll hint */}
        <div
          className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-3 sm:bottom-8"
          style={{ opacity: progress < 0.92 ? 1 : 0, transition: "opacity 0.5s" }}
        >
          <div className="flex items-center gap-2" aria-hidden="true">
            {chapters.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === activeIndex ? "w-6 bg-champagne" : "w-1.5 bg-cream/40",
                )}
              />
            ))}
          </div>
          <span className="text-xs uppercase tracking-kicker text-cream/70">
            {dict.hero.scrollHint}
          </span>
        </div>
      </div>
    </section>
  );
}
