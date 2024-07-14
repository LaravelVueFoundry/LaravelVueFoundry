<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  message?: string
}>(), {
})
</script>

<template>
  <div
    v-show="props.message"
    :class="twMerge(
      'font-semibold text-danger-600',
      props.class,
    )"
  >
    <p>{{ props.message }}</p>
  </div>
</template>
