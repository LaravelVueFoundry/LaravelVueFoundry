import vue from "@vitejs/plugin-vue"
import laravel from "laravel-vite-plugin"
import i18n from "laravel-vue-i18n/vite"
import path from "node:path"
import process from "node:process"
import { defineConfig } from "vite"

const port = 5173
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`

export default defineConfig({
  resolve: {
    alias: {
      "ziggy-js": path.resolve("vendor/tightenco/ziggy"),
    },
  },
  plugins: [
    laravel({
      input: "resources/js/app.ts",
      refresh: true,
      ssr: "resources/js/ssr.ts",
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    i18n({
      additionalLangPaths: ["public/locales"],
    }),
  ],
  server: {
    host: "0.0.0.0",
    origin,
    port,
    strictPort: true,
  },
})
