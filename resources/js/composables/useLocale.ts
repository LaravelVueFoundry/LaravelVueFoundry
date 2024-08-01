import { usePage } from "@inertiajs/vue3"
import { trans } from "laravel-vue-i18n"

export function useLocale() {
  const page = usePage()
  const locale = page.props.locale

  return { locale, t: trans }
}
