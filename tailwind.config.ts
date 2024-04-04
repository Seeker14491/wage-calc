import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    function ({ addComponents }) {
      addComponents({
        ".spinner-none": {
          "-moz-appearance": "textfield",
          "&::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "&::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
        },
      });
    },
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
};

export default config;
