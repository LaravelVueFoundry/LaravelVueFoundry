<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
import { usePage } from "@inertiajs/vue3"
import {
  Dropdown,
  Footer,
  Header,
  ToastContainer,
  type DropdownItem,
} from "@local/ui"
import { computed } from "vue"
import { useRoute } from "ziggy-js"

type Method = "get" | "post"

const appName = import.meta.env.VITE_APP_NAME
const page = usePage()

const route = useRoute(page.props.ziggy)
const { locale, setLocale, t } = useLocale()

const languages = computed(() => {
  return (page.props.locales as string[]).map(
    (locale) =>
      ({
        prefix: {
          type: "icon",
          value: `circle-flags:${locale}`,
        },
        key: locale,
        value: t(`locale.name.${locale}`),
      }) satisfies DropdownItem,
  )
})

const linksPrimary: InstanceType<typeof Header>["$props"]["linksPrimary"] = []

const linksSecondary = computed<
  InstanceType<typeof Header>["$props"]["linksSecondary"]
>(() => {
  const result = []

  if (page.props.auth.user) {
    result.push({
      icon: "mdi:account",
      title: t("menu.profile").value,
      href: route("profile.view", { lang: locale }),
    })

    result.push({
      icon: "mdi:logout",
      title: t("menu.logout").value,
      href: route("logout", { lang: locale }),
      method: "post" as Method,
    })

    return result
  }
  result.push({
    icon: "mdi:login",
    title: t("menu.login").value,
    href: route("login", { lang: locale }),
  })

  result.push({
    icon: "mdi:register",
    title: t("menu.register").value,
    href: route("register", { lang: locale }),
  })

  return result
})

const socials = [
  {
    icon: "mdi:github",
    title: "Github",
    href: "https://github.com/LaravelVueFoundry/LaravelVueFoundry",
  },
]

async function setLanguage(item: DropdownItem) {
  if (item.key === locale) return

  await setLocale(item.key?.toString() ?? "")
}
</script>

<template>
  <Header
    :home-path="route('home', { lang: locale })"
    :links-primary="linksPrimary"
    :links-secondary="linksSecondary"
    :logo="{ src: '/images/logo.svg', height: 128, width: 128 }"
    :site-name="appName"
  />

  <main
    id="main-content"
    class="flex flex-1"
  >
    <slot />
  </main>

  <Footer
    :home-path="route('home', { lang: locale })"
    :logo="{ src: '/images/logo.svg', height: 128, width: 128 }"
    :site-name="appName"
    :socials="socials"
  >
    <Dropdown
      class="shrink-0"
      :default="locale"
      direction="up"
      :items="languages"
      required
      @select-item="async (item) => await setLanguage(item)"
    />
  </Footer>

  <ToastContainer />
</template>
