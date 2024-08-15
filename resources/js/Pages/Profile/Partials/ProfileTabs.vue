<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
import { usePage } from "@inertiajs/vue3"
import { Tab, Tabs } from "@local/ui"
import { useRoute } from "ziggy-js"

const page = usePage()

const route = useRoute(page.props.ziggy)
const { locale, t } = useLocale()

const tabs = [
  {
    title: t("profile.tabs.view.title"),
    href: route("profile.view", { lang: locale }),
  },
  {
    title: t("profile.tabs.edit.title"),
    href: route("profile.edit", { lang: locale }),
  },
] satisfies Tab[]
</script>

<template>
  <Tabs :items="tabs" />
</template>
