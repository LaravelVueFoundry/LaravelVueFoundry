<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { type HTMLAttributes, onMounted, reactive } from 'vue'
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

const emit = defineEmits(['update:modelValue'])
const modelValue = defineModel<number[]>()

const options = reactive(Array.from({ length: props.options.length }).fill(false) as boolean[])

onMounted(() => {
  options.forEach((_entry, index) => {
    options[index] = modelValue.value?.includes(index) ?? false
  })
})

function updateOptions(element: HTMLInputElement) {
  options[+element.value] = element.checked ?? false
  const selectedIndices: number[] = []

  options.forEach((option, index) => {
    if (option)
      selectedIndices.push(index)
  })

  emit('update:modelValue', selectedIndices)
}
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
        class="relative size-6 shrink-0"
      >
        <input
          :id="`${option.label.toLocaleLowerCase()}-${index}`"
          :checked="modelValue && modelValue.includes(index)"
          :class="twMerge(
            'absolute peer opacity-0 size-full',
            props.class,
          )"
          :name="props.name"
          :required="props.required"
          type="checkbox"
          :value="index"
          @change="(e) => updateOptions(e.target as HTMLInputElement)"
        >

        <div
          class="pointer-events-none absolute size-full rounded-md border-2 border-gray-300 bg-white shadow outline-2 outline-offset-2 transition-[border-color,box-shadow] peer-checked:border-primary-600 peer-hover:shadow-md peer-focus-visible:outline peer-focus-visible:outline-primary-500"
        />

        <svg
          class="pointer-events-none absolute inset-0 m-auto mb-0 w-0 -rotate-45 rounded-sm opacity-0 transition-[background-color,opacity,transform,width] ease-exaggerate peer-checked:w-full peer-checked:rotate-0 peer-checked:opacity-100"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="fill-primary-600"
            clip-rule="evenodd"
            d="M20.207 6.793a1 1 0 0 1 0 1.414l-9.5 9.5a1 1 0 0 1-1.414 0l-4.5-4.5a1 1 0 0 1 1.414-1.414L10 15.586l8.793-8.793a1 1 0 0 1 1.414 0"
            fill-rule="evenodd"
          />
        </svg>
      </div>

      <Label
        :for="`${option.label.toLocaleLowerCase()}-${index}`"
      >
        {{ option.label }}
      </Label>
    </div>
  </div>
</template>
