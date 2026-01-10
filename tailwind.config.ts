import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lacquer: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337"
        },
        gold: {
          50: "#fffce5",
          100: "#fff7b8",
          200: "#ffef7a",
          300: "#ffe13d",
          400: "#ffd012",
          500: "#f2b705",
          600: "#c78d00",
          700: "#9a6400",
          800: "#7d4f00",
          900: "#6a4100"
        }
      },
      boxShadow: {
        "gold-glow": "0 0 0 1px rgba(255, 208, 18, 0.35), 0 10px 30px rgba(255, 208, 18, 0.15)",
        "lacquer-glow": "0 0 0 1px rgba(244, 63, 94, 0.35), 0 10px 30px rgba(244, 63, 94, 0.18)"
      },
      backgroundImage: {
        "vietnam-gradient":
          "radial-gradient(1200px circle at 20% 0%, rgba(255, 208, 18, 0.18), transparent 45%), radial-gradient(900px circle at 80% 10%, rgba(244, 63, 94, 0.18), transparent 45%), linear-gradient(180deg, rgba(159, 18, 57, 0.12), transparent 45%)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
} satisfies Config;

