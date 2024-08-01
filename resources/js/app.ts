import "../css/app.css"
import "./bootstrap"

import { createInertiaApp } from "@inertiajs/vue3"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"
import { i18nVue } from "laravel-vue-i18n"
import type { DefineComponent } from "vue"
import { createApp, h } from "vue"
import { ZiggyVue } from "../../vendor/tightenco/ziggy"

const appName = import.meta.env.VITE_APP_NAME || "LaravelVueFoundry"

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob<DefineComponent>("./Pages/**/*.vue"),
    ),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ZiggyVue)
      .use(i18nVue, {
        resolve: (lang: string) => {
          const langs = import.meta.glob<{ default: unknown }>(
            "../../lang/*.json",
            { eager: true },
          )
          return langs[`../../lang/${lang}.json`].default
        },
      })
      .mount(el)
  },
  progress: {
    color: "#4B5563",
  },
})
