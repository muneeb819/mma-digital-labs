import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        labs: {
          bg: "#ffffff",
          panel: "#f0f8fc",
          card: "#ffffff",
          line: "#dadce0",
          navy: "#03034d",
          ink: "#1a1a1a",
          royal: "#2021a8",
          gold: "#d19e0b",
          goldDark: "#b3870a",
          sky: "#34a3f2",
          azure: "#009cf4",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "Work Sans", "system-ui", "sans-serif"],
        display: ["var(--font-head)", "Epilogue", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
