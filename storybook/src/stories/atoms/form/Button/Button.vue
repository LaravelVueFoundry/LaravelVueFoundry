<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  type?: 'button' | 'submit'
  variant?: 'primary' | 'warning' | 'danger' | 'ghost'
  size?: 'lg' | 'md' | 'sm'
  to?: string
  disabled?: boolean
  loading?: boolean
}>(), {
  size: 'md',
})

const emit = defineEmits<{ (emit: 'click', e: PointerEvent): void }>()

const buttonType = computed(() => {
  if (props.to)
    return 'a'

  return 'button'
})

const bgColor = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-600 hover:bg-primary-500 active:bg-primary-700 border-primary-500 hover:border-primary-400 active:border-primary-600'
    case 'warning':
      return 'text-warning-900 bg-warning-400 hover:bg-warning-300 active:bg-warning-500 border-warning-300 hover:border-warning-200 active:border-warning-400'
    case 'danger':
      return 'bg-danger-600 hover:bg-danger-500 active:bg-danger-700 border-danger-500 hover:border-danger-400 active:border-danger-600'
    case 'ghost':
      return 'text-black dark:text-white bg-transparent hover:bg-black/10 dark:hover:bg-white/10 active:bg-black/20 dark:active:bg-white/20'
    default:
      return 'bg-gray-700 hover:bg-gray-600 active:bg-gray-800 border-gray-600 hover:border-gray-500 active:border-gray-700'
  }
})

const padding = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'px-8 py-4 rounded-xl'
    case 'sm':
      return 'px-4 py-2 rounded-lg'
    default:
      return 'px-6 py-3 rounded-lg'
  }
})
</script>

<template>
  <component
    :is="buttonType"
    :class="twMerge(
      'inline-block border font-semibold text-white shadow hover:shadow-md active:shadow-none disabled:pointer-events-none disabled:opacity-50',
      'outline-offset-4 focus:outline-primary-500',
      'transition-[background,border,box-shadow,opacity]',
      bgColor,
      padding,
      (props.loading) ? 'animate-pulse opacity-75' : undefined,
      props.class,
    )"
    :disabled="props.loading || props.disabled"
    :href="to"
    :type="type"
    @click="(e: PointerEvent) => emit('click', e)"
  >
    <slot />
  </component>
</template>
