import { router, usePage } from "@inertiajs/vue3"
import { loadLanguageAsync, wTrans } from "laravel-vue-i18n"

export function useLocale() {
  const page = usePage()
  const locale = page.props.locale as string

  async function setLocale(key: string) {
    if (key === locale) return

    const url = page.url.split("/").filter(Boolean)
    url.shift()

    await loadLanguageAsync(key)
    return router.get(`/${key}/${url.join("/")}`, undefined, {
      only: ["locale", "wTrans"],
    })
  }

  return { locale, setLocale, t: wTrans }
}
