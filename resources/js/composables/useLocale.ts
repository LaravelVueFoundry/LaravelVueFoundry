import { usePage } from "@inertiajs/vue3"

export function useLocale() {
  const page = usePage()
  const locale = page.props.locale

  return { locale }
}
