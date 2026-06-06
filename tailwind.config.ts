import type { Config } from "tailwindcss";

/**
 * HuisFeest visual system (locked in Phase 1 scope).
 * Palette: warm cream base, dark charcoal text, olive/forest green accent,
 * champagne highlight, muted terracotta tag, warm gray surfaces/dividers.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F6F1E7",
          50: "#FBF8F1",
          100: "#F6F1E7",
          200: "#ECE3D2",
        },
        charcoal: {
          DEFAULT: "#211D18",
          soft: "#3A352E",
          muted: "#6A6358",
        },
        olive: {
          DEFAULT: "#5A6B47",
          dark: "#3F4B32",
          light: "#7C8A66",
        },
        champagne: {
          DEFAULT: "#DCC79B",
          soft: "#E9DBBE",
        },
        terracotta: {
          DEFAULT: "#B5694E",
          soft: "#C98A72",
        },
        warmgray: {
          DEFAULT: "#D9D2C5",
          dark: "#B8B0A1",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        kicker: "0.22em",
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.9s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
