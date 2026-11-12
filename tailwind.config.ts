import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Futuristic dark system — matte, muted, zero neon.
        labs: {
          bg: "#0a0d13", // deep space base
          panel: "#11161f", // elevated section surface
          card: "#161c27", // card / form surface
          line: "#242d3b", // crisp 1px borders
          navy: "#0d1420", // deepest surface (footer, bands)
          ink: "#e9edf4", // primary text (near-white)
          royal: "#8aa3c9", // muted steel blue
          gold: "#c8a24c", // muted brass — primary accent
          goldDark: "#a8843a", // pressed / secondary gold
          sky: "#1d2c40", // muted blue band
          azure: "#41608c", // focus borders
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "Work Sans", "system-ui", "sans-serif"],
        display: ["var(--font-head)", "Epilogue", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        // Signature easing — decelerating, "system boot" feel
        fut: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
