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
      spacing: {
        xs: "0.25rem", // 4px
        sm: "0.375rem", // 6px (4px * 1.618 ≈ 6)
        md: "0.625rem", // 10px (6px * 1.618 ≈ 10)
        lg: "1rem", // 16px (10px * 1.618 ≈ 16)
        xl: "1.625rem", // 26px (16px * 1.618 ≈ 26)
        "2xl": "2.625rem", // 42px (26px * 1.618 ≈ 42)
        "3xl": "4.25rem", // 68px (42px * 1.618 ≈ 68)
      },
      colors: {
        "mbp-gray": "#efefef",
        "mbp-green": {
          "50": "#eefffb",
          "100": "#c6fff6",
          "200": "#8cffee",
          "300": "#4bfde5",
          "400": "#16ebd4",
          "500": "#00cebb",
          "600": "#00a69a",
          "700": "#017a73", // our green
          "800": "#076864",
          "900": "#0b5652",
          "950": "#003535",
        },
        "mbp-red": {
          "50": "#fef3f2",
          "100": "#fee4e2",
          "200": "#fdcecb",
          "300": "#fbaca6",
          "400": "#f67c73",
          "500": "#ed5146",
          "600": "#da3428",
          "700": "#b7281e",
          "800": "#98241c",
          "900": "#75221c", // our red
          "950": "#440f0b",
        },
      },
    },
  },
  plugins: [],
};
export default config;
