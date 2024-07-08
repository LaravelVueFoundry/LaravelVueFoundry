<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { type HTMLAttributes, computed } from 'vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  required?: boolean
  type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'textarea'
  placeholder?: string
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
      'border-2 px-6 py-3 rounded-lg transition-all shadow-inner focus:shadow-md',
      'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700',
      props.class,
    )"
    :placeholder="props.placeholder"
    :required="props.required"
    :type="(componentType === 'input') ? type : undefined"
  />
</template>
