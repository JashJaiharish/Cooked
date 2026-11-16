/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        craft: {
          bg: "#F5F2EB",
          oatmeal: "#EAE4D7",
          sheet: "#FAF8F3",
          card: "#E4DDCF",
          deep: "#DDD5C4",
        },
        pencil: {
          DEFAULT: "#1D1C1A",
          soft: "#2A2825",
          muted: "#78736A",
          faint: "#D6D0C2",
          rule: "rgba(29, 28, 26, 0.12)",
        },
        accent: {
          red: "#D94534",
          redSoft: "rgba(217, 69, 52, 0.12)",
          blue: "#385A94",
          green: "#3A7347",
        },
      },
      fontFamily: {
        handwriting: ["'Caveat'", "cursive"],
        display: ["'Plus Jakarta Sans'", "'Space Grotesk'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "Consolas", "monospace"],
      },
      boxShadow: {
        paper: "0 10px 30px -8px rgba(29, 28, 26, 0.08), 0 1px 3px rgba(29, 28, 26, 0.04)",
        "paper-lift": "0 20px 45px -10px rgba(29, 28, 26, 0.12), 0 2px 6px rgba(29, 28, 26, 0.06)",
        pill: "0 2px 6px rgba(29, 28, 26, 0.04)",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0",
        wide: "0.06em",
        widest: "0.14em",
      },
      animation: {
        'marquee-left': 'marqueeLeft 28s linear infinite',
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
