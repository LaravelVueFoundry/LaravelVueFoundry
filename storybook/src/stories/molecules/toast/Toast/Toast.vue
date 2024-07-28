<script setup lang="ts">
import Card from "@/stories/atoms/container/Card/Card.vue"
import Heading from "@/stories/atoms/typography/Heading/Heading.vue"
import { Icon } from "@iconify/vue"
import { useMouseInElement, useRafFn, useWindowFocus } from "@vueuse/core"
import { twMerge } from "tailwind-merge"
import { ref, watch, type HTMLAttributes } from "vue"
import { Toast } from "./types/toast"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    onClose?: () => void
    toast: Toast
    wrapperClass?: HTMLAttributes["class"]
  }>(),
  {
    class: undefined,
    onClose: () => {},
    wrapperClass: undefined,
  },
)

const progressCircumference = 2 * Math.PI * 10

const toastRef = ref<HTMLElement | null>(null)

const timeoutMs = ref(props.toast.timeoutMs ?? 5000)

const { isActive, pause, resume } = useRafFn(
  /* v8 ignore start */
  ({ delta }) => {
    if (timeoutMs.value <= 0) {
      props.onClose()
      return
    }

    timeoutMs.value = Math.max(0, timeoutMs.value - delta)
  },
  /* v8 ignore stop */
  {
    fpsLimit: 30,
  },
)

const focus = useWindowFocus()
const { isOutside } = useMouseInElement(toastRef)

watch(isOutside, () => {
  /* v8 ignore start */
  if (isActive && isOutside.value && focus.value) resume()
  else pause()
  /* v8 ignore stop */
})

watch(focus, () => {
  /* v8 ignore start */
  if (isActive && focus.value) resume()
  else pause()
  /* v8 ignore stop */
})
</script>

<template>
  <Card
    ref="toastRef"
    :class="twMerge('flex-row gap-2', props.toast.bgClasses, props.class)"
    data-test-id="toast"
    :wrapper-class="twMerge('', props.wrapperClass)"
  >
    <Icon
      v-if="toast.icon"
      :class="twMerge('-ms-2 mt-px size-5 shrink-0', toast.iconClasses)"
      :icon="toast.icon"
      ssr
    />

    <div class="flex flex-1 flex-col gap-2 overflow-hidden">
      <Heading
        v-if="toast.title"
        class="select-none overflow-hidden text-ellipsis leading-tight"
        :title="toast.title"
        type="h5"
      >
        {{ toast.title }}
      </Heading>

      <div
        class="select-none overflow-hidden text-ellipsis leading-tight"
        :title="toast.message"
      >
        {{ toast.message }}
      </div>
    </div>

    <div class="relative ms-4 mt-px self-start">
      <Icon
        class="size-5 shrink-0 cursor-pointer"
        data-test-id="toast-close"
        icon="mdi:close"
        role="button"
        ssr
        @click="onClose"
      />

      <svg
        aria-hidden="true"
        class="pointer-events-none absolute -inset-1 -rotate-90"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <circle
          class="stroke-black opacity-25 dark:stroke-white"
          cx="12"
          cy="12"
          fill="none"
          r="10"
          stroke-width="2"
          :style="{
            strokeDasharray: progressCircumference,
            strokeDashoffset:
              progressCircumference *
              (1 - timeoutMs / (props.toast.timeoutMs ?? 5000)),
          }"
        />
      </svg>
    </div>
  </Card>
</template>
