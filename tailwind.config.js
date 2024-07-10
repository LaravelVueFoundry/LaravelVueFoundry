import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.vue',
    './node_modules/@local/ui/dist/**/*.js',
  ],

  theme: {
    colors: {
      primary: colors.indigo,
      warning: colors.amber,
      danger: colors.rose,

      black: colors.black,
      gray: colors.neutral,
      white: colors.white,

      success: colors.green,
      transparent: colors.transparent,
    },
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
      transitionTimingFunction: {
        exaggerate: 'cubic-bezier(0, 1.25, 1, 1.25)',
      },
    },
  },

  plugins: [forms],
}
