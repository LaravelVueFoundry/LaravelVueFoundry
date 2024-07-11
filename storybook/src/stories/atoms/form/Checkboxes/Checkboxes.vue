<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { type HTMLAttributes, type Ref, ref } from 'vue'
import Checkbox from '../Checkbox/Checkbox.vue'

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

const options = Array.from({ length: props.options.length }).fill(ref(false)) as Ref<boolean>[]

props.options.forEach((_entry, index) => {
  options[index] = ref(modelValue.value?.includes(index) ?? false)
})

function updateOptions(element: HTMLInputElement) {
  options[+element.value].value = element.checked ?? false
  const selectedIndices: number[] = []

  options.forEach((option, index) => {
    if (option.value)
      selectedIndices.push(index)
  })

  emit('update:modelValue', selectedIndices)
}
</script>

<template>
  <div
    class="flex flex-col gap-2"
  >
    <Checkbox
      v-for="(option, index) of props.options"
      :key="`${option.label}${index}`"
      v-model="options[index].value"
      :class="twMerge(
        'flex items-center gap-2',
        props.wrapperClass,
      )"
      :label="option.label"
      :name="props.name"
      :value="`${index}`"
      @change="(e: Event) => updateOptions(e.target as HTMLInputElement)"
    />
  </div>
</template>
