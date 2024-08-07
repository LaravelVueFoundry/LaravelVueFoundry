<script setup lang="ts">
import Container from "@/stories/atoms/container/Container/Container.vue"
import Button from "@/stories/atoms/form/Button/Button.vue"
import { Icon } from "@iconify/vue"
import { Link } from "@inertiajs/vue3"
import { useElementSize, useWindowScroll, useWindowSize } from "@vueuse/core"
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap"
import { twMerge } from "tailwind-merge"
import { ComputedRef, type HTMLAttributes, computed, nextTick, ref } from "vue"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    siteName?: string
    homePath?: string
    linksPrimary?: {
      icon?: string
      title: string | ComputedRef
      href: string
      method?: "get" | "post"
    }[]
    linksSecondary?: {
      icon?: string
      title: string
      href: string
      method?: "get" | "post"
    }[]
  }>(),
  {
    class: undefined,
    homePath: "/",
    siteName: undefined,
    title: undefined,
    linksPrimary: undefined,
    linksSecondary: undefined,
  },
)

const headerRef = ref<HTMLElement | null>(null)
const mobileMenuRef = ref<HTMLElement | null>(null)
const mobileMenuContainerRef = ref<HTMLElement | null>(null)

const { y } = useWindowScroll()
const { width: windowWidth } = useWindowSize()
const { height: headerHeight } = useElementSize(headerRef)

const isAnimating = ref(false)
const isMobileMenuOpen = ref(false)
const isMobileMenuInnerOpen = ref(false)

const { activate: ftActivate, deactivate: ftDeactivate } = useFocusTrap(
  mobileMenuContainerRef,
  {
    allowOutsideClick: true,
  },
)

const isMobile = computed(() => {
  return windowWidth.value < 768
})

function openMobileMenu() {
  document.body.classList.add("overflow-hidden")
  isMobileMenuOpen.value = true
  isAnimating.value = true
}

function closeMobileMenu() {
  isMobileMenuInnerOpen.value = false
  isAnimating.value = true
}

async function onMobileMenuOpened() {
  isMobileMenuInnerOpen.value = true

  await nextTick()

  /* v8 ignore start */
  if (process.env.NODE_ENV !== "test") ftActivate()
  /* v8 ignore stop */
}

async function onMobileMenuClosed() {
  isMobileMenuInnerOpen.value = false
  document.body.classList.remove("overflow-hidden")
  isAnimating.value = false

  await nextTick()

  /* v8 ignore start */
  if (process.env.NODE_ENV !== "test") ftDeactivate()
  /* v8 ignore stop */
}

defineExpose({ openMobileMenu, closeMobileMenu })
</script>

<template>
  <header
    ref="headerRef"
    :class="
      twMerge(
        'sticky top-0 z-40 bg-gray-100/80 backdrop-blur-sm transition-shadow duration-500 dark:bg-gray-950/80',
        y > 0 ? 'shadow-md' : '',
        props.class,
      )
    "
  >
    <Container
      class="flex items-center justify-between gap-4 py-4 md:py-6 lg:gap-6"
    >
      <Link
        class="text-xl font-medium"
        :href="props.homePath"
      >
        {{ props.siteName }}
      </Link>

      <div
        v-if="isMobile"
        class="flex gap-6"
        data-test-id="menu-mobile"
      >
        <Button
          class="shadow-none"
          data-test-id="header-menu-toggle"
          icon="mdi:dots-horizontal"
          size="square"
          variant="ghost"
          @click.prevent="
            () => {
              if (isAnimating) return

              isMobileMenuInnerOpen ? closeMobileMenu() : openMobileMenu()
            }
          "
        />
      </div>
      <div
        v-else
        class="flex flex-1 gap-4 lg:gap-6"
        data-test-id="menu-desktop"
      >
        <div class="flex flex-1 items-center gap-4 lg:gap-6">
          <div
            v-for="link in props.linksPrimary"
            :key="`${link.title}${link.href}`"
          >
            <Link
              :as="link.method === 'post' ? 'button' : undefined"
              class="flex items-center gap-1 lg:gap-2"
              :href="link.href"
              :method="link.method"
            >
              <Icon
                v-if="link.icon"
                class="size-5"
                :icon="link.icon"
                ssr
              />
              {{ link.title }}
            </Link>
          </div>
        </div>

        <div class="flex items-center justify-end gap-4 lg:gap-6">
          <div
            v-for="link in props.linksSecondary"
            :key="`${link.title}${link.href}`"
          >
            <Link
              :as="link.method === 'post' ? 'button' : undefined"
              class="flex items-center gap-1 lg:gap-2"
              :href="link.href"
              :method="link.method"
            >
              <Icon
                v-if="link.icon"
                class="size-5"
                :icon="link.icon"
                ssr
              />
              {{ link.title }}
            </Link>
          </div>
        </div>
      </div>
    </Container>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-[opacity,backdrop-filter]"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100 backdrop-blur-sm"
        leave-active-class="transition-[opacity,backdrop-filter]"
        leave-from-class="opacity-100 backdrop-blur-sm"
        leave-to-class="opacity-0 backdrop-blur-none"
        @after-enter="onMobileMenuOpened()"
        @after-leave="onMobileMenuClosed()"
      >
        <div
          v-if="isMobile && isMobileMenuOpen"
          ref="mobileMenuContainerRef"
          class="fixed inset-0 z-30"
        >
          <div
            class="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            data-test-id="header-menu-wrapper"
            @click="closeMobileMenu"
          />

          <Transition
            appear
            data-test-id="header-menu-transition-inner"
            enter-active-class="transition-[opacity,inset-inline-start]"
            enter-from-class="-start-full opacity-0"
            enter-to-class="start-0 opacity-100"
            leave-active-class="transition-[opacity,inset-inline-start]"
            leave-from-class="start-0 opacity-100"
            leave-to-class="-start-full opacity-0"
            @after-enter="isAnimating = false"
            @after-leave="isMobileMenuOpen = false"
          >
            <div
              v-if="isMobileMenuInnerOpen"
              ref="mobileMenuRef"
              class="fixed bottom-0 z-40 w-80 max-w-full bg-gray-100/80 shadow backdrop-blur-sm dark:bg-gray-950/80"
              data-test-id="header-menu-body"
              :style="{ top: `${headerHeight}px` }"
            >
              <button
                class="ms-auto block p-4"
                @click="closeMobileMenu"
              >
                <Icon
                  class="size-6"
                  icon="mdi:close"
                  ssr
                />
              </button>

              <div class="fixed inset-0 top-14 overflow-y-auto px-8">
                <div
                  v-for="link in props.linksPrimary"
                  :key="`${link.title}${link.href}`"
                >
                  <Link
                    class="flex items-center gap-2 py-4"
                    :href="link.href"
                  >
                    <Icon
                      v-if="link.icon"
                      class="size-5"
                      :icon="link.icon"
                      ssr
                    />
                    {{ link.title }}
                  </Link>
                </div>

                <div
                  v-for="link in props.linksSecondary"
                  :key="`${link.title}${link.href}`"
                >
                  <Link
                    class="flex items-center gap-2 py-4"
                    :href="link.href"
                  >
                    <Icon
                      v-if="link.icon"
                      class="size-5"
                      :icon="link.icon"
                      ssr
                    />
                    {{ link.title }}
                  </Link>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
