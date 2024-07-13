<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'
import Label from '../Label/Label.vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  name: string
  label: string
  required?: boolean
  value?: string
}>(), {
})

const emit = defineEmits(['change', 'update:modelValue'])
const modelValue = defineModel<boolean>()

function updateValue(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
  emit('change', e)
}
</script>

<template>
  <div
    class="flex items-center gap-2"
  >
    <div
      class="relative size-6 shrink-0"
    >
      <input
        :id="`${label.toLocaleLowerCase()}`"
        :checked="modelValue"
        :class="twMerge(
          'peer absolute size-full opacity-0',
          props.class,
        )"
        data-test-id="checkbox-input"
        :name="props.name"
        :required="props.required"
        type="checkbox"
        :value="props.value"
        @change="(e) => updateValue(e)"
      >

      <div
        class="pointer-events-none absolute size-full rounded-md border-2 border-gray-300 bg-white shadow outline-2 outline-offset-2 transition-[border-color,box-shadow] peer-checked:border-primary-600 peer-hover:shadow-md peer-focus-visible:outline peer-focus-visible:outline-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:shadow-inner dark:peer-checked:border-primary-500"
      />

      <svg
        class="pointer-events-none absolute inset-0 m-auto mb-0 w-0 -rotate-45 rounded-sm opacity-0 transition-[background-color,opacity,transform,width] ease-exaggerate peer-checked:w-full peer-checked:rotate-0 peer-checked:opacity-100"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="fill-primary-600 dark:fill-primary-500"
          clip-rule="evenodd"
          d="M20.207 6.793a1 1 0 0 1 0 1.414l-9.5 9.5a1 1 0 0 1-1.414 0l-4.5-4.5a1 1 0 0 1 1.414-1.414L10 15.586l8.793-8.793a1 1 0 0 1 1.414 0"
          fill-rule="evenodd"
        />
      </svg>
    </div>

    <Label
      :for="`${label.toLocaleLowerCase()}`"
    >
      {{ label }}
    </Label>
  </div>
</template>
