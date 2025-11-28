import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          deep: "#0d0d0d",
          card: "#141414",
          elevated: "#1a1a1a",
          lighter: "#1a1a1a",
          hover: "#1f1f1f",
        },
        text: {
          primary: "#e0e0e0",
          secondary: "#888888",
          muted: "#555555",
          inverse: "#0d0d0d",
        },
        accent: {
          DEFAULT: "#c8ff00",
          hover: "#d4ff33",
          dim: "rgba(200, 255, 0, 0.15)",
          glow: "rgba(200, 255, 0, 0.3)",
        },
        negative: "#ff4444",
        positive: "#4caf50",
        warning: "#ff9800",
        border: {
          DEFAULT: "#222222",
          light: "#333333",
        },
        rank: {
          gold: "#ffd700",
          silver: "#c0c0c0",
          bronze: "#cd7f32",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease",
        "fade-up": "fadeUp 0.6s ease",
        "fade-down": "fadeDown 0.5s ease",
        "pulse-glow": "pulse 2s ease infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(200, 255, 0, 0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(200, 255, 0, 0.2)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
