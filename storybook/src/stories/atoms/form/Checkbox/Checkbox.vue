<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { twMerge } from "tailwind-merge"
import type { HTMLAttributes } from "vue"
import Label from "../Label/Label.vue"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    name: string
    label: string
    required?: boolean
    value?: string
  }>(),
  {
    class: undefined,
    value: undefined,
  },
)

const emit = defineEmits(["change", "update:modelValue"])
const modelValue = defineModel<boolean>()

function updateValue(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).checked)
  emit("change", e)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="relative size-6 shrink-0">
      <input
        :id="`${label.toLocaleLowerCase()}`"
        :checked="modelValue"
        :class="twMerge('peer absolute size-full opacity-0', props.class)"
        data-test-id="checkbox-input"
        :name="props.name"
        :required="props.required"
        type="checkbox"
        :value="props.value"
        @change="(e) => updateValue(e)"
      />

      <div
        class="pointer-events-none absolute size-full rounded-md border border-gray-300 bg-white shadow outline-2 outline-offset-2 transition-[border-color,box-shadow] peer-checked:border-primary-600 peer-hover:shadow-md peer-focus-visible:outline peer-focus-visible:outline-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:shadow-inner dark:peer-checked:border-primary-500"
      />

      <Icon
        class="pointer-events-none absolute inset-0 m-auto mb-0 size-full w-0 -rotate-45 text-primary-600 opacity-0 transition-[background-color,opacity,transform,width] ease-exaggerate peer-checked:w-full peer-checked:rotate-0 peer-checked:opacity-100 dark:text-primary-500"
        icon="mdi:check"
        ssr
      />
    </div>

    <Label :for="`${label.toLocaleLowerCase()}`">
      {{ label }}
    </Label>
  </div>
</template>
