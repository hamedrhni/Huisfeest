"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content";
import { drawHeroScene } from "./heroScene";
import { useImageSequence } from "./useImageSequence";

/**
 * Cinematic scroll hero.
 *
 * DEFAULT (V1): FRAME_COUNT = 0 → renders the procedural scene from heroScene.ts
 * (no media assets required). To use real footage, set FRAME_COUNT to your frame
 * count and drop the frames in /public/hero (see useImageSequence.ts). The rest of
 * this component does not change.
 *
 * Accessibility: respects prefers-reduced-motion by rendering a static,
 * non-scrubbing hero with the full chapter narrative as plain text.
 */
const FRAME_COUNT = 0;

export function CinematicHero({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { frames, ready, loaded } = useImageSequence(FRAME_COUNT);
  const useFrames = FRAME_COUNT > 0;
  const loadingPct = useFrames ? Math.round((loaded / FRAME_COUNT) * 100) : 100;

  const chapters = dict.hero.chapters;
  const activeIndex = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));

  const draw = useCallback(
    (p: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { clientWidth: w, clientHeight: h } = canvas;

      if (useFrames && ready && frames.length > 0) {
        const idx = Math.min(frames.length - 1, Math.round(p * (frames.length - 1)));
        const img = frames[idx];
        if (img && img.complete && img.naturalWidth > 0) {
          // cover-fit the frame
          const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
          const dw = img.naturalWidth * scale;
          const dh = img.naturalHeight * scale;
          ctx.clearRect(0, 0, w, h);
          ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
          return;
        }
      }
      drawHeroScene(ctx, w, h, p);
    },
    [useFrames, ready, frames],
  );

  // Detect reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Handle hi-dpi canvas sizing + redraw on resize.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(reducedMotion ? 0.55 : progressRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw, reducedMotion]);

  // Scroll-linked progress (skipped under reduced motion).
  useEffect(() => {
    if (reducedMotion) {
      draw(0.55);
      return;
    }
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
        progressRef.current = p;
        setProgress(p);
        draw(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion, draw]);

  // Redraw frames once they finish loading.
  useEffect(() => {
    if (ready) draw(reducedMotion ? 0.55 : progressRef.current);
  }, [ready, draw, reducedMotion]);

  // ---- Reduced-motion: static, fully accessible hero ----------------------
  if (reducedMotion) {
    return (
      <section className="relative flex min-h-screen items-center overflow-hidden bg-charcoal">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
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

  // ---- Motion: sticky canvas scrubbed by scroll ---------------------------
  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-charcoal">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

        {/* readability scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-charcoal/30" />

        {/* loading UI (only meaningful when real frames are used) */}
        {useFrames && !ready && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-charcoal text-cream">
            <div className="h-px w-40 overflow-hidden bg-cream/20">
              <div className="h-full bg-champagne transition-all" style={{ width: `${loadingPct}%` }} />
            </div>
            <p className="text-sm tracking-wide text-cream/70">{dict.hero.loading}</p>
          </div>
        )}

        {/* chapter overlays */}
        <div className="container-editorial relative z-10 text-cream">
          <div className="relative h-[60vh] max-w-3xl">
            {chapters.map((chapter, i) => (
              <div
                key={chapter.kicker}
                aria-hidden={i !== activeIndex}
                className={`absolute inset-x-0 top-1/2 -translate-y-1/2 transition-opacity duration-700 ease-editorial ${
                  i === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <p className="kicker text-champagne">{chapter.kicker}</p>
                <h1 className="mt-4 text-4xl leading-tight md:text-6xl">{chapter.title}</h1>
                <p className="mt-6 max-w-xl text-lg text-cream/85">{chapter.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* scroll hint */}
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
