<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'
import Label from '../Label/Label.vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
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
      <input
        :id="`${option.label.toLocaleLowerCase()}${index}`"
        :class="twMerge(
          '',
          props.class,
        )"
        :name="props.name"
        type="radio"
      >

      <Label
        :for="`${option.label.toLocaleLowerCase()}${index}`"
      >
        {{ option.label }}
      </Label>
    </div>
  </div>
</template>
