<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { type HTMLAttributes, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  src: string
  alt: string
  height?: number
  width?: number
  crossorigin?: 'anonymous' | 'use-credentials'
  decoding?: 'async' | 'sync' | 'auto'
  loading?: 'lazy' | 'eager'
  srcset?: string
  sizes?: string
}>(), {
  loading: 'lazy',
})

const imgSrc = ref('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')

onMounted(() => {
  imgSrc.value = props.src
})
</script>

<template>
  <img
    :alt="alt"
    :class="twMerge(
      'object-cover',
      props.class,
    )"
    :crossorigin="crossorigin"
    :decoding="decoding"
    :height="height && `${height}px`"
    :loading="loading"
    :sizes="sizes"
    :src="imgSrc"
    :srcset="srcset"
    :style="{
      aspectRatio: width && height && `${width || 1}/${height || 1}`,
    }"
    :width="width && `${width}px`"
  >
</template>
