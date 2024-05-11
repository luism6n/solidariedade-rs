import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1350px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        xs: "0.25rem", // 4px
        sm: "0.375rem", // 6px (4px * 1.618 ≈ 6)
        md: "0.625rem", // 10px (6px * 1.618 ≈ 10)
        lg: "1rem", // 16px (10px * 1.618 ≈ 16)
        xl: "1.625rem", // 26px (16px * 1.618 ≈ 26)
        "2xl": "2.625rem", // 42px (26px * 1.618 ≈ 42)
        "3xl": "4.25rem", // 68px (42px * 1.618 ≈ 68)
      },
    },
  },
  plugins: [],
};
export default config;
