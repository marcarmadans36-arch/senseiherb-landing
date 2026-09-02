/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dojo: {
          bg:        "#080e0b",
          surface:   "#0d1710",
          card:      "#142018",
          border:    "rgba(255,255,255,0.07)",
          green:     "#34d399",
          "green-d": "#059669",
          gold:      "#f59e0b",
          "gold-l":  "#fcd34d",
          muted:     "rgba(255,255,255,0.5)",
        },
      },
      fontFamily: {
        display: ['"Zen Kaku Gothic New"', "sans-serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grad-hero":   "radial-gradient(ellipse 80% 60% at 50% 0%, #142018 0%, #080e0b 70%)",
        "grad-cta":    "radial-gradient(ellipse 70% 50% at 50% 100%, #142018 0%, #080e0b 70%)",
        "grad-green":  "linear-gradient(135deg, #34d399, #059669)",
        "grad-gold":   "linear-gradient(135deg, #f59e0b, #fcd34d)",
      },
      boxShadow: {
        green: "0 0 32px rgba(52,211,153,0.25)",
        gold:  "0 0 48px rgba(245,158,11,0.3)",
        card:  "0 4px 32px rgba(0,0,0,0.4)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease both",
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};
