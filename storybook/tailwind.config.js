import base from "../tailwind.config"

/** @type {import('tailwindcss').Config} */
export default {
  ...base,
  content: ["./src/**/*.{vue,ts,mdx}"],
  darkMode: ["selector"],
}
