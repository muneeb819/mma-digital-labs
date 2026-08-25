import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        labs: {
          bg: "#ffffff",
          panel: "#f4f6f8",
          card: "#ffffff",
          line: "#d9dee4",
          navy: "#14273a",
          ink: "#1a1a1a",
          royal: "#3e6b9e",
          gold: "#96754a",
          goldDark: "#7a5c36",
          sky: "#587fa9",
          azure: "#4a80b8",
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
