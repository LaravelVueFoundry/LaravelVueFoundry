<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'
import Label from '../Label/Label.vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  defaultOption?: number
  wrapperClass?: HTMLAttributes['class']
  name: string
  options: {
    label: string
  }[]
  required?: boolean
}>(), {
})
</script>

<template>
  <div
    class="flex flex-col gap-2"
  >
    <div
      v-for="(option, index) of props.options"
      :key="option.label"
      :class="twMerge(
        'flex items-center gap-2',
        props.wrapperClass,
      )"
    >
      <div
        class="relative size-6"
      >
        <input
          :id="`${option.label.toLocaleLowerCase()}-${index}`"
          :checked="index === props.defaultOption"
          :class="twMerge(
            'absolute peer opacity-0 size-full',
            props.class,
          )"
          :name="props.name"
          :required="props.required"
          type="radio"
        >
        <div
          :class="twMerge(
            'pointer-events-none absolute size-full rounded-full transition-[box-shadow]',
            'bg-white shadow peer-hover:shadow-md border-2 border-gray-300 peer-checked:border-primary-600',
            'peer-focus-visible:outline-primary-500 outline-offset-2 peer-focus-visible:outline outline-2',
          )"
        />
        <div
          class="absolute inset-1/2 rounded-full shadow-inner transition-[background-color,inset] peer-checked:inset-1/3 peer-checked:bg-primary-600"
        />
      </div>

      <Label
        :for="`${option.label.toLocaleLowerCase()}-${index}`"
      >
        {{ option.label }}
      </Label>
    </div>
  </div>
</template>
