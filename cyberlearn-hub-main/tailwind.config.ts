import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        surface: "#0F1318",
        "surface-2": "#141A21",
        border: "rgba(255,255,255,0.08)",
        "border-hover": "rgba(255,255,255,0.16)",
        text: "#E7EBEF",
        "text-dim": "#8B96A3",
        "text-faint": "#5B6572",
        green: {
          DEFAULT: "#00FF88",
          dim: "#00C46A",
        },
        blue: {
          DEFAULT: "#00C8FF",
          dim: "#0090BD",
        },
        purple: {
          DEFAULT: "#A855F7",
          dim: "#7E3FD1",
        },
        severity: {
          low: "#00FF88",
          medium: "#FFC800",
          high: "#FF8A00",
          critical: "#FF3B5C",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,255,136,0.15), 0 0 24px rgba(0,255,136,0.08)",
        "glow-blue": "0 0 0 1px rgba(0,200,255,0.15), 0 0 24px rgba(0,200,255,0.08)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        scan: "scan 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
