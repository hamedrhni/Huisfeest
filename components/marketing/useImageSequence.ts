"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Loads a numbered image sequence for the cinematic hero (the REAL-footage path).
 *
 * V1 ships with FRAME_COUNT = 0 in CinematicHero (procedural scene, no assets).
 * To use real footage:
 *   1. Export your hero clip to frames, e.g. /public/hero/frame_0001.jpg ... frame_0120.jpg
 *   2. In CinematicHero.tsx set FRAME_COUNT to the number of frames.
 *   3. Done — the hook preloads them and the hero scrubs frames instead of drawing procedurally.
 *
 * Frame path convention: `${basePath}/frame_${n.padStart(4,'0')}.${ext}`
 */
export function useImageSequence(
  count: number,
  basePath = "/hero",
  ext = "jpg",
): { frames: HTMLImageElement[]; loaded: number; ready: boolean } {
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(count === 0);

  useEffect(() => {
    if (count <= 0) {
      setReady(true);
      return;
    }
    let cancelled = false;
    let done = 0;
    const frames: HTMLImageElement[] = [];

    for (let i = 1; i <= count; i++) {
      const img = new Image();
      img.src = `${basePath}/frame_${String(i).padStart(4, "0")}.${ext}`;
      img.onload = img.onerror = () => {
        if (cancelled) return;
        done += 1;
        setLoaded(done);
        if (done >= count) setReady(true);
      };
      frames.push(img);
    }
    framesRef.current = frames;

    return () => {
      cancelled = true;
    };
  }, [count, basePath, ext]);

  return { frames: framesRef.current, loaded, ready };
}
