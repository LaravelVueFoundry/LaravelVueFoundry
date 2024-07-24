import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/vue3"
import "../src/style.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /^Date$/i,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Introduction", "Atoms", "Molecules", "Ecosystems"],
      },
    },
  },
}

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
]

export default preview
