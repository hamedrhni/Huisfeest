/**
 * Procedural cinematic hero scene (the DEFAULT V1 placeholder "footage").
 *
 * This draws an abstract "evening unfolding" on a 2D canvas, interpolated by a
 * scroll progress value p (0 → 1). It needs ZERO binary assets, so the hero
 * works out of the box. To swap in REAL footage later, provide an image
 * sequence and flip the hero to frame mode (see CinematicHero.tsx + useImageSequence.ts).
 *
 * Pure function: no DOM/React, easy to reason about and replace.
 */

type RGB = [number, number, number];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function mix(a: RGB, b: RGB, t: number): string {
  const r = Math.round(lerp(a[0], b[0], t));
  const g = Math.round(lerp(a[1], b[1], t));
  const bl = Math.round(lerp(a[2], b[2], t));
  return `rgb(${r}, ${g}, ${bl})`;
}

// Deterministic bokeh particles (no randomness at render time).
const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  x: ((i * 97) % 100) / 100,
  y: ((i * 53) % 100) / 100,
  r: 2 + ((i * 17) % 10),
  drift: ((i % 5) - 2) * 0.04,
}));

const SKY_TOP_DUSK: RGB = [31, 36, 46];
const SKY_TOP_WARM: RGB = [58, 40, 38];
const SKY_BOT_DUSK: RGB = [74, 60, 52];
const SKY_BOT_WARM: RGB = [150, 104, 70];

export function drawHeroScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  p: number,
): void {
  const t = Math.min(1, Math.max(0, p));
  ctx.clearRect(0, 0, width, height);

  // 1. Sky gradient warms up as the evening progresses.
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, mix(SKY_TOP_DUSK, SKY_TOP_WARM, t));
  sky.addColorStop(1, mix(SKY_BOT_DUSK, SKY_BOT_WARM, t));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  // 2. Warm radial glow (candlelight) growing in the lower third.
  const glowX = width * 0.5;
  const glowY = height * 0.72;
  const glowR = Math.max(width, height) * (0.25 + t * 0.5);
  const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowR);
  glow.addColorStop(0, `rgba(220, 199, 155, ${0.18 + t * 0.5})`);
  glow.addColorStop(1, "rgba(220, 199, 155, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // 3. Floating bokeh — opacity rises with progress.
  for (const part of PARTICLES) {
    const px = (part.x + part.drift * t) * width;
    const py = part.y * height * 0.85;
    const alpha = 0.04 + t * 0.16;
    ctx.beginPath();
    ctx.fillStyle = `rgba(233, 219, 190, ${alpha})`;
    ctx.arc(px, py, part.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. The table surface emerges near the bottom.
  const tableY = height * (0.88 - t * 0.04);
  const table = ctx.createLinearGradient(0, tableY, 0, height);
  table.addColorStop(0, `rgba(33, 29, 24, ${0.35 + t * 0.45})`);
  table.addColorStop(1, "rgba(20, 17, 14, 0.95)");
  ctx.fillStyle = table;
  ctx.fillRect(0, tableY, width, height - tableY);

  // 5. Candle flames + plates fade in on the table as we reach later chapters.
  const reveal = Math.max(0, (t - 0.25) / 0.75);
  if (reveal > 0) {
    const items = 5;
    for (let i = 0; i < items; i++) {
      const cx = width * (0.18 + (i / (items - 1)) * 0.64);
      const cy = tableY + 6;
      // plate
      ctx.beginPath();
      ctx.fillStyle = `rgba(236, 227, 210, ${0.5 * reveal})`;
      ctx.ellipse(cx, cy + 10, 26, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      // candle flame glow
      const flame = ctx.createRadialGradient(cx, cy - 18, 0, cx, cy - 18, 22);
      flame.addColorStop(0, `rgba(255, 214, 150, ${0.9 * reveal})`);
      flame.addColorStop(1, "rgba(255, 214, 150, 0)");
      ctx.fillStyle = flame;
      ctx.beginPath();
      ctx.arc(cx, cy - 18, 22, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 6. Subtle vignette for cinematic framing.
  const vignette = ctx.createRadialGradient(
    width / 2,
    height / 2,
    Math.min(width, height) * 0.3,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.75,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.45)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}
