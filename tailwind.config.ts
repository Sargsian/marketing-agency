import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#ffa217",
        "gray-light": "#252525",
        "gray-medium": "#595953",
        "gray-dark": "#393939",
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
      },
      fontSize: {},
      containers: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".heading-1": {
          "@apply xl:text-[96px] md:text-7xl text-[32px] sm:text-6xl xl:mx-7 font-semibold leading-none tracking-tighter md:leading-[96px]":
            {},
        },
        ".heading-2": {
          "@apply text-[40px] lg:text-[64px] font-semibold tracking-tighter leading-[64px]":
            {},
        },
        ".heading-3": {
          "@apply text-[24px] md:text-[28px] lg:text-[36px] font-semibold tracking-tighter leading-[36px]":
            {},
        },
        ".heading-3-v2": {
          "@apply text-[16px] sm:text-[20px] md:text-[28px] lg:text-[36px] font-medium leading-[120%]":
            {},
        },
        ".heading-4": {
          "@apply text-[24px] font-normal font-jetbrains tracking-tighter leading-[24px]":
            {},
        },
        ".heading-5": {
          "@apply text-[18px] font-medium font-jetbrains tracking-tighter leading-[24px]":
            {},
        },
        ".heading-6": {
          "@apply text-[14px] font-medium tracking-[2px] leading-[14px]": {},
        },
        ".lead-1": {
          "@apply text-[16px] font-medium tracking-tighter leading-[21px]": {},
        },
        ".subtitle": {
          "@apply text-[14px] font-medium font-jetbrains tracking-[-0.84px] leading-[18px]":
            {},
        },
        ".subtitle-2": {
          "@apply text-[12px] font-medium font-jetbrains tracking-[2px] leading-[16px]":
            {},
        },
        ".subtitle-3": {
          "@apply text-[10px] font-medium font-jetbrains tracking-[-0.6px]": {},
        },
        ".placeholder": {
          "@apply text-[14px] font-normal font-jetbrains leading-[20px]": {},
        },
        ".link": {
          "@apply text-[14px] text-accent hover:no-underline font-medium font-jetbrains tracking-tighter underline leading-[14px]":
            {},
        },
        ".tag": {
          "@apply text-[12px] lg:text-[14px] py-1 px-3 bg-white text-black font-jetbrains uppercase":
            {},
        },
      });
    }),
    require("@tailwindcss/container-queries"),
  ],
} satisfies Config;
