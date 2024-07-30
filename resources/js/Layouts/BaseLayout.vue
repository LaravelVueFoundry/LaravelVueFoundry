<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
import { usePage } from "@inertiajs/vue3"
import { Footer, Header, ToastContainer } from "@local/ui"
import { computed } from "vue"
import { useRoute } from "ziggy-js"

const appName = import.meta.env.VITE_APP_NAME
const page = usePage()

const route = useRoute(page.props.ziggy)
const { locale } = useLocale()

const linksPrimary: InstanceType<typeof Header>["$props"]["linksPrimary"] = []

const linksSecondary = computed<
  InstanceType<typeof Header>["$props"]["linksSecondary"]
>(() => {
  const result = []

  if (page.props.auth.user) {
    result.push({
      icon: "mdi:graph-line",
      title: "Dashboard",
      href: route("dashboard", { lang: locale }),
    })

    result.push({
      icon: "mdi:account",
      title: "Profile",
      href: route("profile.edit", { lang: locale }),
    })

    result.push({
      icon: "mdi:logout",
      title: "Log out",
      href: route("logout", { lang: locale }),
    })

    return result
  }
  result.push({
    icon: "mdi:login",
    title: "Log in",
    href: route("login", { lang: locale }),
  })

  result.push({
    icon: "mdi:register",
    title: "Register",
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
</script>

<template>
  <Header
    :home-path="route('home', { lang: locale })"
    :links-primary="linksPrimary"
    :links-secondary="linksSecondary"
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
    :site-name="appName"
    :socials="socials"
  />

  <ToastContainer />
</template>
