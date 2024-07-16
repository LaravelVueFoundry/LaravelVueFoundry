<script setup lang="ts">
import { type HTMLAttributes, nextTick, ref, useSlots } from 'vue'
import { twMerge } from 'tailwind-merge'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { onKeyStroke } from '@vueuse/core'
import Card from '@/stories/atoms/container/Card/Card.vue'

import Container from '@/stories/atoms/container/Container/Container.vue'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
}>(), {
})

const emit = defineEmits(['onClose'])

const slots = useSlots()

const isOpen = ref(false)
const isInnerOpen = ref(false)

const modalContainerRef = ref(null)
const { activate: ftActivate, deactivate: ftDeactivate } = useFocusTrap(modalContainerRef)

onKeyStroke('Escape', () => {
  if (!isOpen.value)
    return

  close()
})

function open() {
  document.body.classList.add('overflow-hidden')
  isOpen.value = true
}

function close() {
  isInnerOpen.value = false
}

async function onModalOpened() {
  isInnerOpen.value = true

  await nextTick()

  /* v8 ignore start */
  if (process.env.NODE_ENV !== 'test')
    ftActivate()
  /* v8 ignore stop */
}

async function onModalClosed() {
  isInnerOpen.value = false
  document.body.classList.remove('overflow-hidden')

  await nextTick()

  /* v8 ignore start */
  if (process.env.NODE_ENV !== 'test')
    ftDeactivate()
  /* v8 ignore stop */

  emit('onClose')
}

defineExpose({ open, close })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-[opacity,backdrop-filter]"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100 backdrop-blur-sm"
      leave-active-class="transition-[opacity,backdrop-filter]"
      leave-from-class="opacity-100 backdrop-blur-sm"
      leave-to-class="opacity-0 backdrop-blur-none"
      @after-enter="onModalOpened()"
      @after-leave="onModalClosed()"
    >
      <div
        v-if="isOpen"
        ref="modalContainerRef"
        class="fixed inset-0 z-50"
      >
        <div
          class="fixed inset-0 bg-black/20 backdrop-blur-sm"
          data-test-id="modal-wrapper"
          @click="close"
        />

        <Container
          class="fixed inset-0 flex flex-col justify-center max-sm:p-2"
          type="narrow"
          @click.self="close"
        >
          <Transition
            appear
            data-test-id="modal-transition-inner"
            enter-active-class="transition-[opacity,transform]"
            enter-from-class="-translate-y-2 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition-[opacity,transform]"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-2 opacity-0"
            @after-leave="isOpen = false"
          >
            <Card
              v-if="isInnerOpen"
              class="max-h-full flex-1 overflow-auto"
              data-test-id="modal-body"
              :wrapper-class="twMerge(
                'flex flex-col max-sm:h-full',
                props.class,
              )"
            >
              <template #header>
                <div
                  class="flex items-center justify-between font-semibold"
                >
                  <slot v-if="slots.title" name="title" />
                  <div v-else />

                  <button
                    class="-m-2 p-2"
                    @click="close"
                  >
                    <svg
                      class="size-6"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </template>

              <div>
                <slot />
              </div>

              <template
                v-if="slots.actions"
                #footer
              >
                <slot name="actions" />
              </template>
            </Card>
          </Transition>
        </Container>
      </div>
    </Transition>
  </Teleport>
</template>
