<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
}>(), {
})
</script>

<template>
  <div
    :class="twMerge(
      'flex flex-col',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
