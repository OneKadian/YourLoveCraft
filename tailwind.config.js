/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
    "./public/fonts/**/*.{ttf,woff,woff2}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ["Inter", "Sans Serif"],
        title: ["Inter", "Sans Serif"],
        reenie: ["'Reenie Beanie'", "cursive"],
        caveat: ["'Caveat'", "cursive"],
        cursive: ["Dancing Script", "cursive"],
      },
      fontSize: {
        body: [
          "1rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        h1: [
          "3.5rem",
          {
            lineHeight: "3.75rem",
          },
        ],
        h2: [
          "2.25rem",
          {
            lineHeight: "2.625rem",
          },
        ],
        h3: [
          "1.875rem",
          {
            lineHeight: "2.25rem",
          },
        ],
        h4: [
          "1.5rem",
          {
            lineHeight: "2rem",
          },
        ],
        h5: [
          "1.25rem",
          {
            lineHeight: "1.75rem",
          },
        ],
        h6: [
          "1.125rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        mini: [
          "0.75rem",
          {
            lineHeight: "1.5rem",
          },
        ],
      },
      colors: {
        black: {
          DEFAULT: "#000000",
          50: "#E6E6E6",
          100: "#CCCCCC",
          200: "#999999",
          300: "#666666",
          400: "#333333",
          500: "#000000",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        white: {
          DEFAULT: "#FFFFFF",
          50: "#FFFFFF",
          100: "#FCFCFC",
          200: "#FCFCFC",
          300: "#FAFAFA",
          400: "#FAFAFA",
          500: "#F7F7F7",
          600: "#C7C7C7",
          700: "#949494",
          800: "#636363",
          900: "#303030",
        },
        primary: {
          DEFAULT: "#FF8FAB",
          foreground: "#FFFFFF",
          50: "#FCFCFC",
          100: "#FCFCFC",
          200: "#FCFCFC",
          300: "#FCFCFC",
          400: "#FAFAFA",
          500: "#FAFAFA",
          600: "#E3E3E3",
          700: "#C7C7C7",
          800: "#A6A6A6",
          900: "#787878",
          950: "#595959",
        },
        secondary: {
          DEFAULT: "#E5DEFF",
          foreground: "#4A154B",
          50: "#FFF9F0",
          100: "#FFF5E5",
          200: "#FFEBCC",
          300: "#FFDEAD",
          400: "#FFD494",
          500: "#FFC56E",
          600: "#FFA929",
          700: "#EB8D00",
          800: "#C77700",
          900: "#8A5300",
          950: "#663D00",
        },
        accent: {
          DEFAULT: "#FFE5E5",
          foreground: "#4A154B",
        },
        badge: "#F1F5F9",
        badgeText: "#475569",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      keyframes: {
        "carousel-left": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "carousel-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "carousel-left": "carousel-left 0.4s ease-out",
        "carousel-right": "carousel-right 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
