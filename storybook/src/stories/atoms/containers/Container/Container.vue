<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { type HTMLAttributes, computed } from 'vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  type?: 'regular' | 'wide' | 'narrow' | 'full'
}>(), {
  type: 'regular',
})

const width = computed(() => {
  switch (props.type) {
    case 'wide':
      return 'max-w-7xl'
    case 'narrow':
      return 'max-w-5xl'
    case 'full':
      return ''
    default:
      return 'max-w-6xl'
  }
})
</script>

<template>
  <div
    :class="twMerge(
      'mx-auto p-8',
      width,
      props.class,
    )"
  >
    <slot />
  </div>
</template>
