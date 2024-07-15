<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { HTMLAttributes } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { Link } from '@inertiajs/vue3'
import Container from '@/stories/atoms/container/Container/Container.vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  title?: string
  links?: {
    title: string
    href: string
  }[]
}>(), {
})

const { y } = useWindowScroll()
</script>

<template>
  <header
    :class="twMerge(
      'sticky top-0 bg-gray-100/80 transition-shadow dark:bg-gray-950/80',
      y > 0 ? 'shadow-md' : '',
      props.class,
    )"
  >
    <Container
      class="flex items-center justify-between gap-8 py-6"
    >
      <Link
        class="text-lg font-semibold"
        href="/"
      >
        {{ props.title }}
      </Link>

      <div
        class="flex gap-6"
      >
        <div
          v-for="link in props.links"
          :key="`${link.title}${link.href}`"
        >
          <Link
            :href="link.href"
          >
            {{ link.title }}
          </Link>
        </div>
      </div>
    </Container>
  </header>
</template>
