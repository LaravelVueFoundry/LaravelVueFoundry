<script setup lang="ts">
import Container from "@/stories/atoms/container/Container/Container.vue"
import { Icon } from "@iconify/vue"
import { Link } from "@inertiajs/vue3"
import { twMerge } from "tailwind-merge"
import type { HTMLAttributes } from "vue"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    siteName?: string
    homePath?: string
    menus?: {
      title: string
      items: {
        icon?: string
        title: string
        href: string
      }[]
    }[]
    socials?: {
      icon: string
      title: string
      href: string
    }[]
  }>(),
  {
    class: undefined,
    siteName: undefined,
    homePath: "/",
    menus: undefined,
    socials: undefined,
  },
)
</script>

<template>
  <footer :class="twMerge('py-8', props.class)">
    <Container>
      <div class="flex flex-col gap-8">
        <div class="flex flex-wrap justify-between gap-8 max-sm:flex-col">
          <Link
            class="text-xl font-medium max-sm:text-center"
            :href="props.homePath"
          >
            {{ props.siteName }}
          </Link>

          <div
            v-if="props.menus"
            class="flex flex-wrap items-center gap-16 max-sm:justify-evenly"
          >
            <div
              v-for="(menu, index) of props.menus"
              :key="index"
              class="flex flex-col gap-2"
            >
              <p class="text-lg font-medium">
                {{ menu.title }}
              </p>

              <Link
                v-for="item of menu.items"
                :key="`${index}${item.title}${item.href}`"
                class="flex items-center gap-1 text-gray-700 dark:text-gray-200"
                :href="item.href"
              >
                <Icon
                  v-if="item.icon"
                  class="size-5"
                  :icon="item.icon"
                  ssr
                />

                {{ item.title }}
              </Link>
            </div>
          </div>
        </div>

        <hr class="border-gray-300 dark:border-gray-700" />

        <div
          class="flex items-center justify-between gap-4 text-gray-700 max-sm:flex-col dark:text-gray-200"
        >
          <p class="text-sm">
            &copy; {{ new Date().getFullYear() }} {{ props.siteName }}
          </p>

          <div class="flex items-center gap-4">
            <slot />

            <a
              v-for="(social, index) of props.socials"
              :key="`${index}${social.title}${social.href}`"
              :href="social.href"
              target="_blank"
              :title="social.title"
            >
              <Icon
                class="size-6"
                :icon="social.icon"
                ssr
              />
            </a>
          </div>
        </div>
      </div>
    </Container>
  </footer>
</template>
