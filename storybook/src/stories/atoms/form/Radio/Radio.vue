<script setup lang="ts">
import { twMerge } from "tailwind-merge"
import type { HTMLAttributes } from "vue"
import Label from "../Label/Label.vue"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    wrapperClass?: HTMLAttributes["class"]
    name: string
    options: {
      label: string
    }[]
    required?: boolean
  }>(),
  {
    class: undefined,
    wrapperClass: undefined,
  },
)

const emit = defineEmits(["update:modelValue"])
const modelValue = defineModel<number>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="(option, index) of props.options"
      :key="option.label"
      :class="twMerge('flex items-center gap-2', props.wrapperClass)"
      data-test-id="radio-wrapper"
    >
      <div class="relative size-6 shrink-0">
        <input
          :id="`${option.label.toLocaleLowerCase()}-${index}`"
          :checked="index === modelValue"
          :class="twMerge('peer absolute size-full opacity-0', props.class)"
          data-test-id="radio-input"
          :name="props.name"
          :required="props.required"
          type="radio"
          :value="index"
          @input="
            (e) =>
              emit('update:modelValue', (e.target as HTMLInputElement)?.value)
          "
        />

        <div
          class="pointer-events-none absolute size-full rounded-full border border-gray-300 bg-white shadow outline-2 outline-offset-2 transition-[border-color,box-shadow] peer-checked:border-primary-600 peer-hover:shadow-md peer-focus-visible:outline peer-focus-visible:outline-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:shadow-inner dark:peer-checked:border-primary-500"
        />

        <div
          class="absolute inset-1/2 rounded-full shadow-inner transition-[background-color,inset] peer-checked:inset-1/3 peer-checked:bg-primary-600 dark:peer-checked:bg-primary-500"
        />
      </div>

      <Label :for="`${option.label.toLocaleLowerCase()}-${index}`">
        {{ option.label }}
      </Label>
    </div>
  </div>
</template>
