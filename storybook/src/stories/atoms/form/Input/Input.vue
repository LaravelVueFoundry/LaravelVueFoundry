<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { type HTMLAttributes, computed } from 'vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  disabled?: boolean
  placeholder?: string
  required?: boolean
  type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'textarea'
}>(), {
})

const componentType = computed(() => {
  switch (props.type) {
    case 'textarea':
      return 'textarea'
    default:
      return 'input'
  }
})
</script>

<template>
  <component
    :is="componentType"
    :class="twMerge(
      'border-2 px-6 py-3 rounded-lg shadow-inner focus:shadow-md',
      'bg-white dark:bg-gray-900 disabled:bg-gray-100 dark:disabled:bg-gray-700 border-gray-300 dark:border-gray-700',
      'placeholder:text-gray-500 disabled:placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:disabled:placeholder:text-gray-500',
      'transition-[background,border,box-shadow,color,opacity,outline]',
      props.class,
    )"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    :required="props.required"
    :type="(componentType === 'input') ? type : undefined"
  />
</template>
