"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content";
import { HERO_CHAPTER_IMAGES } from "@/lib/hero-images";
import { cn } from "@/lib/utils";

/** Visible viewport height — accounts for mobile browser chrome (address bar). */
function getViewportHeight(): number {
  return window.visualViewport?.height ?? window.innerHeight;
}

/**
 * Cinematic scroll hero — one photo per chapter (4 images in public/hero/).
 * Background crossfades in sync with chapter text as the visitor scrolls.
 *
 * Mobile: uses visualViewport + touch listeners + intersection markers because
 * iOS Safari often fails to update scroll progress with sticky + overflow-hidden.
 */
export function CinematicHero({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const chapters = dict.hero.chapters;
  const chapterCount = chapters.length;
  const chapterImages = HERO_CHAPTER_IMAGES.slice(0, chapterCount);

  const updateFromScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const viewportH = getViewportHeight();
    const start = section.offsetTop;
    const scrollable = section.offsetHeight - viewportH;

    if (scrollable <= 0) {
      setProgress(0);
      setActiveIndex(0);
      return;
    }

    const p = Math.min(1, Math.max(0, (scrollY - start) / scrollable));
    setProgress(p);

    // Map progress to chapter: each chapter owns an equal scroll band.
    const index = Math.min(chapterCount - 1, Math.floor(p * chapterCount));
    setActiveIndex(index);
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
    const scheduleUpdate = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateFromScroll();
      });
    };

    // Scroll + touch: iOS often needs touchmove for live updates during finger scroll.
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("touchmove", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("orientationchange", scheduleUpdate);

    const vv = window.visualViewport;
    vv?.addEventListener("scroll", scheduleUpdate);
    vv?.addEventListener("resize", scheduleUpdate);

    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("touchmove", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
      vv?.removeEventListener("scroll", scheduleUpdate);
      vv?.removeEventListener("resize", scheduleUpdate);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion, updateFromScroll]);

  // IntersectionObserver backup — reliable on mobile when scroll math is flaky.
  useEffect(() => {
    if (reducedMotion) return;

    const markers = markerRefs.current.filter(Boolean) as HTMLDivElement[];
    if (markers.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Number(b.target.getAttribute("data-chapter")) -
              Number(a.target.getAttribute("data-chapter")),
          );

        if (visible.length > 0) {
          const idx = Number(visible[0].target.getAttribute("data-chapter"));
          if (!Number.isNaN(idx)) {
            setActiveIndex(idx);
            setProgress((idx + 0.5) / chapterCount);
          }
        }
      },
      {
        // Fire when a chapter marker crosses the middle of the screen.
        root: null,
        rootMargin: "-42% 0px -42% 0px",
        threshold: 0,
      },
    );

    markers.forEach((m) => observer.observe(m));
    return () => observer.disconnect();
  }, [reducedMotion, chapterCount]);

  // ---- Reduced-motion: static hero with first chapter image ----------------
  if (reducedMotion) {
    return (
      <section className="relative flex min-h-[100dvh] min-h-screen items-center overflow-hidden bg-charcoal">
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
          <h1 className="mt-4 max-w-3xl text-3xl leading-tight sm:text-4xl md:text-6xl">{chapters[0].title}</h1>
          <p className="mt-6 max-w-xl text-base text-cream/80 sm:text-lg">{chapters[0].body}</p>
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

  // Scroll track: one viewport height per chapter. 100dvh tracks mobile chrome.
  const scrollTrackHeight = `${chapterCount * 100}dvh`;

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal"
      style={{ height: scrollTrackHeight }}
    >
      {/* Invisible markers — one per chapter band for IntersectionObserver */}
      {chapters.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            markerRefs.current[i] = el;
          }}
          data-chapter={i}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 w-full"
          style={{
            top: `calc(${i} * 100dvh + 50dvh)`,
            height: "1px",
          }}
        />
      ))}

      {/*
        Sticky panel: NO overflow-hidden here — that breaks position:sticky on iOS.
        Clipping is handled on the inner image layer instead.
      */}
      <div className="sticky top-0 h-[100dvh] min-h-screen w-full">
        <div className="relative h-full w-full">
          {/* Image layer */}
          <div className="absolute inset-0 overflow-hidden">
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
            <div
              className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-charcoal/30"
              aria-hidden="true"
            />
          </div>

          {/* Chapter text */}
          <div className="container-editorial relative z-10 flex h-full items-center text-cream">
            <div className="relative min-h-[45dvh] w-full max-w-3xl py-20 sm:min-h-[50dvh] sm:py-24">
              {chapters.map((chapter, i) => (
                <div
                  key={chapter.kicker}
                  aria-hidden={i !== activeIndex}
                  className={cn(
                    "absolute inset-0 flex flex-col justify-center transition-opacity duration-700 ease-editorial",
                    i === activeIndex ? "z-10 opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <p className="kicker text-champagne">{chapter.kicker}</p>
                  <h1 className="mt-3 text-3xl leading-tight sm:mt-4 sm:text-4xl md:text-6xl">
                    {chapter.title}
                  </h1>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85 sm:mt-6 sm:text-lg">
                    {chapter.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint + chapter dots (helps mobile discoverability) */}
          <div
            className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-4 sm:bottom-8"
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
      </div>
    </section>
  );
}
