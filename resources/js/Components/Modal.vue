<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    show?: boolean
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    closeable?: boolean
  }>(),
  {
    show: false,
    maxWidth: '2xl',
    closeable: true,
  },
)

const emit = defineEmits(['close'])

watch(
  () => props.show,
  () => {
    if (props.show) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'visible'
    }
  },
)

function close() {
  if (props.closeable) {
    emit('close')
  }
}

function closeOnEscape(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.show) {
    close()
  }
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))

onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape)
  document.body.style.overflow = 'visible'
})
</script>

<template>
  <Teleport to="body">
    <div v-show="show" class="fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-0" scroll-region>
      <div v-show="show" class="fixed inset-0" @click="close">
        <div class="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900" />
      </div>

      <div
        v-show="show"
        class="fixed left-1/2 mb-6 -translate-x-1/2 overflow-hidden bg-white shadow-xl sm:mx-auto sm:w-full"
      >
        <slot v-if="show" />
      </div>
    </div>
  </Teleport>
</template>
