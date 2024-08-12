<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { twMerge } from "tailwind-merge"
import { type HTMLAttributes, onMounted, ref, watch } from "vue"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    src: string
    alt: string
    height?: number
    width?: number
    crossorigin?: "anonymous" | "use-credentials"
    decoding?: "async" | "sync" | "auto"
    loading?: "lazy" | "eager"
    srcset?: string
    sizes?: string
  }>(),
  {
    class: undefined,
    height: undefined,
    width: undefined,
    crossorigin: undefined,
    decoding: "async",
    loading: "lazy",
    srcset: undefined,
    sizes: undefined,
  },
)

const imgSrc = ref(
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
)

const hasError = ref(false)
const isLoaded = ref(false)

onMounted(() => {
  imgSrc.value = props.src
})

watch(
  () => props.src,
  () => {
    hasError.value = false
    isLoaded.value = false
    imgSrc.value = props.src
  },
)

function onImgLoadError() {
  hasError.value = true
}

defineExpose({ hasError, isLoaded })
</script>

<template>
  <img
    v-if="!hasError"
    :alt="alt"
    :class="twMerge('object-cover', props.class)"
    :crossorigin="crossorigin"
    data-test-id="image"
    :decoding="decoding"
    :height="height && `${height}px`"
    :loading="loading"
    :onerror="onImgLoadError"
    :onload="(isLoaded = true)"
    :sizes="sizes"
    :src="imgSrc"
    :srcset="srcset"
    :style="{
      aspectRatio: width && height && `${width || 1}/${height || 1}`,
    }"
    :width="width && `${width}px`"
  />

  <div
    v-else
    :class="
      twMerge(
        'flex h-auto max-w-full bg-gray-200 dark:bg-gray-900',
        props.class,
      )
    "
    :style="{
      aspectRatio: width && height && `${width || 1}/${height || 1}`,
      width: width && `${width}px`,
    }"
  >
    <Icon
      class="m-auto size-64 max-h-full max-w-full fill-gray-300 opacity-10 dark:fill-gray-800"
      icon="mdi:image-broken-variant"
      ssr
    />
  </div>
</template>
