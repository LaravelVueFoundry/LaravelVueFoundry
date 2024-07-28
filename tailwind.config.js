import forms from "@tailwindcss/forms"
import colors from "tailwindcss/colors"
import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.vue",
    "./node_modules/@local/ui/dist/**/*.js",
  ],

  theme: {
    colors: {
      primary: colors.blue,

      black: colors.black,
      gray: colors.neutral,
      white: colors.white,
      lime: colors.lime,
      orange: colors.orange,
      yellow: colors.yellow,

      info: colors.sky,
      success: colors.green,
      warning: colors.amber,
      danger: colors.rose,

      transparent: colors.transparent,
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      transitionTimingFunction: {
        exaggerate: "cubic-bezier(0, 1.25, 1, 1.25)",
      },
    },
  },

  plugins: [forms],
}
