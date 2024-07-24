<script setup lang="ts">
import { usePage } from "@inertiajs/vue3"
import { Header } from "@local/ui"
import { computed } from "vue"

const page = usePage()

const linksPrimary: InstanceType<typeof Header>["$props"]["linksPrimary"] = []

const linksSecondary = computed<
  InstanceType<typeof Header>["$props"]["linksSecondary"]
>(() => {
  const result = []

  if (page.props.auth.user) {
    result.push({
      icon: "mdi:graph-line",
      title: "Dashboard",
      href: route("dashboard"),
    })

    result.push({
      icon: "mdi:account",
      title: "Profile",
      href: route("profile.edit"),
    })

    result.push({
      icon: "mdi:logout",
      title: "Log out",
      href: route("logout"),
    })
  } else {
    result.push({
      icon: "mdi:login",
      title: "Log in",
      href: route("login"),
    })

    result.push({
      icon: "mdi:register",
      title: "Register",
      href: route("register"),
    })
  }

  return result
})
</script>

<template>
  <Header
    :links-primary="linksPrimary"
    :links-secondary="linksSecondary"
    title="LaravelVueFoundry"
  />

  <main id="main-content">
    <slot />
  </main>
</template>
