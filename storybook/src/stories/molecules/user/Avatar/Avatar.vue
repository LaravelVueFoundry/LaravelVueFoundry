<script setup lang="ts">
import Image from "@/stories/atoms/base/Image/Image.vue"
import { twMerge } from "tailwind-merge"
import { computed, type HTMLAttributes, ref } from "vue"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    src?: string
    name: string
    onload?: () => void
  }>(),
  {
    class: undefined,
    src: undefined,
    onload: () => {},
  },
)

const imageRef = ref<typeof Image | null>(null)

const initials = computed(() => {
  if (!imageRef.value?.hasError) return ""

  return props.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 3)
    .toUpperCase()
})
</script>

<template>
  <Image
    v-show="!imageRef?.hasError"
    ref="imageRef"
    :alt="props.name"
    :class="
      twMerge('aspect-square max-w-full rounded-full shadow-md', props.class)
    "
    data-test-id="avatar-img"
    :height="256"
    :onload="props.onload"
    :src="props.src ?? ''"
    :title="$props.name"
    :width="256"
  />

  <svg
    v-if="imageRef && imageRef.hasError"
    :class="
      twMerge(
        'aspect-square max-w-full rounded-full bg-gray-200 shadow-md dark:bg-gray-800',
        $props.class,
      )
    "
    data-test-id="avatar-fallback"
    viewBox="0 0 256 256"
    width="256px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ $props.name }}</title>
    <text
      class="select-none fill-gray-400 text-[5.5rem] dark:fill-gray-700"
      dominant-baseline="central"
      text-anchor="middle"
      x="50%"
      y="50%"
    >
      {{ initials }}
    </text>
  </svg>
</template>
