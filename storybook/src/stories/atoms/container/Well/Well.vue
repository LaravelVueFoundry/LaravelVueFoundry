<script setup lang="ts">
import { twMerge } from "tailwind-merge"
import { type HTMLAttributes, computed } from "vue"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    size?: "lg" | "md" | "sm"
  }>(),
  {
    class: undefined,
    size: "md",
  },
)

const padding = computed(() => {
  switch (props.size) {
    case "lg":
      return "p-8 rounded-2xl"
    case "sm":
      return "px-3 py-2 rounded-lg"
    default:
      return "p-6 rounded-xl"
  }
})
</script>

<template>
  <div
    :class="
      twMerge(
        'border border-gray-200 bg-white shadow-inner dark:border-gray-800 dark:bg-gray-900',
        padding,
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
