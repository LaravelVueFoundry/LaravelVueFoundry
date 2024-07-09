<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { type HTMLAttributes, computed, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  autocomplete?: string
  autofocus?: boolean
  class?: HTMLAttributes['class']
  disabled?: boolean
  formnovalidate?: boolean
  id?: string
  maxlength?: number
  modelValue?: string
  name: string
  placeholder?: string
  required?: boolean
  type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'textarea'
}>(), {
})

const emit = defineEmits(['update:modelValue'])

const input = ref<HTMLInputElement | null>(null)
defineExpose({ focus: () => input.value?.focus() })

onMounted(() => {
  if (input.value?.hasAttribute('autofocus')) {
    input.value?.focus()
  }
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
    :id="props.id"
    ref="input"
    :autocomplete="props.autocomplete"
    :autofocus="props.autofocus"
    :class="twMerge(
      'border-2 px-6 py-3 rounded-lg shadow-inner focus:shadow-md',
      'bg-white dark:bg-gray-900 disabled:bg-gray-100 dark:disabled:bg-gray-700 border-gray-300 dark:border-gray-700',
      'placeholder:text-gray-500 disabled:placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:disabled:placeholder:text-gray-500',
      'transition-[background,border,box-shadow,color,opacity,outline]',
      props.class,
    )"
    :disabled="props.disabled"
    :formnovalidate="props.formnovalidate"
    :maxlength="props.maxlength"
    :name="props.name"
    :placeholder="props.placeholder"
    :required="props.required"
    :type="(componentType === 'input') ? type : undefined"
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
