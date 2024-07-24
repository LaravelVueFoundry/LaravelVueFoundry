import process from "node:process"
import path from "node:path"
import laravel from "laravel-vite-plugin"
import vue from "@vitejs/plugin-vue"
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
  ],
  server: {
    host: "0.0.0.0",
    origin,
    port,
    strictPort: true,
  },
})
