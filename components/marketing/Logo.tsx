/**
 * HuisFeest wordmark + mark. PLACEHOLDER brand asset (V1) — replace with the
 * final logo when brand design is ready. Inherits color via `currentColor`.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 168 32"
      role="img"
      aria-label="HuisFeest"
      fill="none"
    >
      {/* mark: a stylised roofline + table */}
      <path
        d="M4 17L15 6l11 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 17v8h16v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="15" cy="20" r="1.6" fill="currentColor" />
      <text
        x="34"
        y="22"
        fontFamily="var(--font-playfair), Georgia, serif"
        fontSize="20"
        fill="currentColor"
        letterSpacing="0.5"
      >
        HuisFeest
      </text>
    </svg>
  );
}
