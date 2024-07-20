<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'
import { Link } from '@inertiajs/vue3'
import Container from '@/stories/atoms/container/Container/Container.vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  title?: string
  linksPrimary?: {
    icon?: string
    title: string
    href: string
  }[]
  linksSecondary?: {
    icon?: string
    title: string
    href: string
  }[]
}>(), {
})
</script>

<template>
  <footer
    :class="twMerge(
      'bg-gray-700 text-white dark:bg-gray-800',
      props.class,
    )"
  >
    <Container>
      <Link
        class="text-xl font-medium"
        href="/"
      >
        {{ props.title }}
      </Link>
    </Container>
  </footer>
</template>
