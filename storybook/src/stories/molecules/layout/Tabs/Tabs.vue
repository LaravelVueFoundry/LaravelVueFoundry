<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { Link } from "@inertiajs/vue3"
import { twMerge } from "tailwind-merge"
import { type HTMLAttributes } from "vue"

export interface Tab {
  icon?: string
  title: unknown
  href: string
  method?: "get" | "post"
}

withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    wrapperClass?: HTMLAttributes["class"]
    items: Tab[]
  }>(),
  {
    class: undefined,
    wrapperClass: undefined,
  },
)
</script>

<template>
  <div :class="twMerge('flex flex-wrap gap-4', $props.wrapperClass)">
    <Link
      v-for="(tab, index) of $props.items"
      :key="`${tab.title}${tab.href}${index}`"
      :class="
        twMerge(
          'flex shrink-0 items-center gap-1 rounded-full border border-gray-200 bg-white px-6 py-3 font-medium shadow transition-[box-shadow,background,border-color] hover:border-gray-200 hover:bg-gray-100 hover:shadow-md lg:gap-2 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700',
          $props.class,
        )
      "
      data-test-id="tabs-tab"
      :href="tab.href"
      :method="tab.method"
    >
      <Icon
        v-if="tab.icon"
        class="size-5"
        :icon="tab.icon"
        ssr
      />

      {{ tab.title }}
    </Link>
  </div>
</template>
