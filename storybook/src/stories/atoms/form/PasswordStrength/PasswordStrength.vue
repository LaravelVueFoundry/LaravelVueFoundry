<script setup lang="ts">
import { twMerge } from "tailwind-merge"
import { type HTMLAttributes, computed, nextTick, ref, watch } from "vue"
import commonPasswords from "./common-passwords"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    password?: string
  }>(),
  {
    class: undefined,
    password: undefined,
  },
)

const levels = [
  "bg-danger-600 outline-danger-700 dark:bg-danger-700 dark:outline-danger-800",
  "bg-orange-600 outline-orange-700 dark:bg-orange-700 dark:outline-orange-800",
  "bg-warning-500 outline-warning-600 dark:bg-warning-600 dark:outline-warning-700",
  "bg-yellow-500 outline-yellow-600 dark:bg-yellow-600 dark:outline-yellow-700",
  "bg-lime-600 outline-lime-700 dark:bg-lime-700 dark:outline-lime-800",
  "bg-success-600 outline-success-700 dark:bg-success-700 dark:outline-success-800",
]

const delayedScore = ref(0)
const score = computed(() => {
  let strength = 0

  if (!props.password) return 0

  if (props.password in commonPasswords) return 0

  if (props.password.length < 6) return 0

  if (props.password.length >= 8) strength += 1

  if (props.password.length >= 12) strength += 1

  if (props.password?.match(/[a-z]+/)) strength += 1

  if (props.password?.match(/[A-Z]+/)) strength += 1

  if (props.password?.match(/\d+/)) strength += 1

  if (props.password?.match(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/))
    strength += 1

  return Math.max(strength, 0)
})

// We need to have a score variable that gets set a tick later.
// That way, we can invert the delays of the staggered animation.
watch(
  () => score.value,
  async () => {
    await nextTick()
    delayedScore.value = score.value
  },
)
</script>

<template>
  <div
    :class="
      twMerge(
        'flex h-3 justify-stretch gap-2 overflow-hidden px-2',
        props.class,
      )
    "
  >
    <div
      v-for="level of levels.length"
      :key="level"
      :class="
        twMerge(
          'relative h-full w-full overflow-hidden rounded-full bg-gray-200 shadow-inner transition-[height] dark:bg-gray-800',
          score <= 0 && 'h-0 delay-200',
        )
      "
    >
      <Transition
        enter-from-class="end-full"
        enter-to-class="end-0"
        leave-from-class="end-0"
        leave-to-class="end-full"
      >
        <div
          v-if="delayedScore >= level"
          :class="
            twMerge(
              'absolute inset-0 rounded-full outline -outline-offset-1 transition-[inset-inline] ease-linear',
              levels[level - 1],
            )
          "
          :style="{
            transitionDelay:
              score >= level
                ? `${(level - score) * 200}ms`
                : `${(score - level + 1) * 200}ms`,
          }"
        />
      </Transition>
    </div>
  </div>
</template>
