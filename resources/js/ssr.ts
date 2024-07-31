import { createInertiaApp } from "@inertiajs/vue3"
import createServer from "@inertiajs/vue3/server"
import { renderToString } from "@vue/server-renderer"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"
import { i18nVue } from "laravel-vue-i18n"
import type { DefineComponent } from "vue"
import { createSSRApp, h } from "vue"
import { ZiggyVue } from "ziggy-js"

const appName = import.meta.env.VITE_APP_NAME || "LaravelVueFoundry"

createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
      resolvePageComponent(
        `./Pages/${name}.vue`,
        import.meta.glob<DefineComponent>("./Pages/**/*.vue"),
      ),
    setup({ App, props, plugin }) {
      const Ziggy = {
        ...page.props.ziggy,
        location: new URL(page.props.ziggy.location),
      }

      return createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .use(ZiggyVue, Ziggy)
        .use(i18nVue, {
          resolve: (lang: string) => {
            const langs = import.meta.glob<{ default: unknown }>(
              "../../lang/*.json",
              { eager: true },
            )
            return langs[`../../lang/${lang}.json`].default
          },
        })
    },
  }),
)
