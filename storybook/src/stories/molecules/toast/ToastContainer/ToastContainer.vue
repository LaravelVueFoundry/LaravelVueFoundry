<script setup lang="ts">
import Button from "@/stories/atoms/form/Button/Button.vue"
import Toast from "@/stories/molecules/toast/Toast/Toast.vue"
import useToast from "@/stories/molecules/toast/ToastContainer/composables/useToast"
import { Icon } from "@iconify/vue"
import { twMerge } from "tailwind-merge"
import { computed, type HTMLAttributes } from "vue"
import { ToastPosition } from "../Toast/types/toast"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    position?: ToastPosition
    noCloseAllButton?: boolean
  }>(),
  {
    class: undefined,
    position: "bottom",
  },
)

const { toasts, removeToast } = useToast()

const toastPosition = computed(() => {
  switch (props.position) {
    case "top-start":
      return "top-0 start-0 max-sm:end-0"

    case "top-end":
      return "top-0 end-0 max-sm:start-0"

    case "top":
      return "top-0 start-1/2 -translate-x-1/2 max-sm:end-0 max-sm:start-0 rtl:translate-x-1/2 rtl:max-sm:translate-x-0  max-sm:translate-x-0"

    case "bottom-start":
      return "bottom-0 start-0 max-sm:end-0"

    case "bottom-end":
      return "bottom-0 end-0 max-sm:start-0"

    default:
      return "bottom-0 start-1/2 -translate-x-1/2 max-sm:end-0 max-sm:start-0 rtl:translate-x-1/2 rtl:max-sm:translate-x-0  max-sm:translate-x-0"
  }
})
</script>

<template>
  <Teleport to="body">
    <TransitionGroup
      :class="
        twMerge(
          'fixed flex gap-4 p-4 max-sm:w-full',
          props.position.endsWith('end') && 'flex-row-reverse',
          toastPosition,
          props.class,
        )
      "
      data-test-id="toast-container-wrapper"
      tag="div"
    >
      <TransitionGroup
        :key="0"
        appear
        class="flex max-w-full flex-col gap-4 max-sm:w-full"
        enter-active-class="transition-all"
        enter-from-class="opacity-0 scale-50"
        enter-to-class="opacity-100 scale-100"
        :leave-active-class="
          twMerge(
            'transition-all',
            props.position.startsWith('bottom') ? 'bottom-0' : 'top-0',
            toasts.length !== 0 && 'absolute w-[calc(100%_-_5.625rem)]',
          )
        "
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-50"
        move-class="transition-all"
        tag="div"
      >
        <Toast
          v-for="toast of toasts"
          :key="toast.id"
          :toast="toast"
          @close="removeToast(toast.id)"
        />
      </TransitionGroup>

      <Transition
        :key="1"
        appear
        enter-active-class="transition-all"
        enter-from-class="opacity-0 scale-50"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-50"
      >
        <div
          v-if="!props.noCloseAllButton && toasts.length > 1"
          :class="
            twMerge(
              'flex',
              props.position.startsWith('bottom')
                ? 'origin-bottom items-end'
                : 'origin-top items-start',
            )
          "
        >
          <Button
            class="rounded-full border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
            data-test-id="toasts-close-all"
            size="square"
            variant="ghost"
            @click="() => (toasts = [])"
          >
            <Icon
              class="size-4"
              icon="mdi:close"
              ssr
            />
          </Button>
        </div>
      </Transition>
    </TransitionGroup>
  </Teleport>
</template>
