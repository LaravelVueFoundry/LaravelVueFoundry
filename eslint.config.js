import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginVue from "eslint-plugin-vue"
import globals from "globals"
import eslintTypescript from "typescript-eslint"

export default [
  eslint.configs.recommended,
  ...eslintTypescript.configs.recommended,
  ...eslintPluginVue.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        route: true,
      },
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  },
  {
    rules: {
      "no-alert": "warn",
      "no-console": "warn",
      "vue/multi-word-component-names": "off",
      "vue/attributes-order": ["error", { alphabetical: true }],
    },
  },
  {
    ignores: [
      "**/.ddev",
      "**/.github",
      "**/bootstrap/ssr",
      "**/composer.json",
      "**/composer.lock",
      "**/public/build",
      "**/resources/js/ziggy.js",
      "**/storage",
      "**/storybook-static",
      "**/storybook/coverage",
      "**/storybook/dist",
      "**/vendor",
    ],
  },
]
