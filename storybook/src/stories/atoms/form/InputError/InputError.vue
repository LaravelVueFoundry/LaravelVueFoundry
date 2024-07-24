<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { twMerge } from "tailwind-merge"
import type { HTMLAttributes } from "vue"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    message?: string
  }>(),
  {
    class: undefined,
    message: undefined,
  },
)
</script>

<template>
  <div
    v-show="props.message"
    :class="
      twMerge(
        'flex items-center gap-1 font-medium text-danger-600',
        props.class,
      )
    "
  >
    <Icon
      class="-mb-0.5"
      icon="mdi:error-outline"
      ssr
    />
    <p>{{ props.message }}</p>
  </div>
</template>
