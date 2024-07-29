<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { onClickOutside, onKeyDown, useElementBounding } from "@vueuse/core"
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap"
import { twMerge } from "tailwind-merge"
import { ref, watch, type HTMLAttributes } from "vue"

export interface Item {
  key: number | string
  value: string
}

const props = withDefaults(
  defineProps<{
    wrapperClass?: HTMLAttributes["class"]
    class?: HTMLAttributes["class"]
    disabled?: boolean
    placeholder?: string
    items?: Item[]
  }>(),
  {
    wrapperClass: undefined,
    class: undefined,
    placeholder: "",
    items: undefined,
  },
)

const dropdownWrapperRef = ref<HTMLElement | null>(null)
const dropdownListRef = ref<HTMLElement | null>(null)
const dropdownListInnerRef = ref<HTMLElement | null>(null)

const { height: listHeight, y: listY } =
  useElementBounding(dropdownListInnerRef)

const isOpen = ref(false)
const selectedItem = ref<Item | undefined>(undefined)

const { activate: ftActivate, deactivate: ftDeactivate } = useFocusTrap(
  dropdownWrapperRef,
  {
    allowOutsideClick: true,
  },
)

watch(
  () => props.disabled,
  () => {
    if (props.disabled) close()
  },
)

function open() {
  isOpen.value = true

  /* v8 ignore start */
  if (process.env.NODE_ENV !== "test") ftActivate()
  /* v8 ignore stop */
}

function close() {
  isOpen.value = false

  /* v8 ignore start */
  if (process.env.NODE_ENV !== "test") ftDeactivate()
  /* v8 ignore stop */
}

function toggle() {
  isOpen.value ? close() : open()
}

onClickOutside(dropdownWrapperRef, close)

function selectItem(e: Event, item: Item | string | number) {
  close()
  emit("change", e)

  if (typeof item === "object" && "key" in item) {
    selectedItem.value = item
    emit("update:modelValue", selectedItem.value)
    return
  }

  selectedItem.value = props.items?.filter((i) => {
    return i.key === item
  })[0]

  emit("update:modelValue", selectedItem.value)
}

onKeyDown("Escape", () => {
  if (!isOpen.value) return

  close()
})

const emit = defineEmits([
  "open",
  "close",
  "toggle",
  "selectItem",
  "change",
  "update:modelValue",
])

defineExpose({ open, close, toggle, selectItem })
</script>

<template>
  <div
    ref="dropdownWrapperRef"
    :class="twMerge('relative', props.wrapperClass)"
  >
    <fieldset
      :class="
        twMerge(
          'flex select-none items-center justify-between gap-4 rounded-xl border bg-white px-4 py-3 transition-shadow disabled:bg-gray-100 disabled:text-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:disabled:bg-gray-700',
          isOpen ? 'shadow-inner' : 'shadow',
          props.class,
        )
      "
      data-test-id="dropdown"
      :disabled="disabled"
      tabindex="0"
      @keydown.enter="() => !props.disabled && toggle()"
      @keydown.space="() => !props.disabled && toggle()"
      @mousedown="() => !props.disabled && toggle()"
    >
      <template v-if="selectedItem">{{ selectedItem.value }}</template>
      <template v-else-if="props.placeholder">
        <span class="text-gray-700 dark:text-gray-400">
          {{ props.placeholder }}
        </span>
      </template>
      <template v-else-if="!props.placeholder"><span>&nbsp;</span></template>

      <Icon
        :class="
          twMerge('size-5 transition-transform', isOpen && '-scale-y-100')
        "
        icon="mdi:keyboard-arrow-down"
        ssr
      />
    </fieldset>

    <Transition
      enter-active-class="transition-[opacity,transform]"
      enter-from-class="scale-95 opacity-0"
      leave-active-class="transition-[opacity,transform]"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        ref="dropdownListInnerRef"
        class="absolute end-0 start-0 top-14"
        data-test-id="dropdown-list"
      >
        <div
          ref="dropdownListRef"
          class="overflow-hidden rounded-xl border bg-white shadow-md dark:border-gray-800 dark:bg-gray-900"
          :style="{
            transform:
              listY + 16 > listHeight
                ? `translateY(-${listY - listHeight + 16}px)`
                : undefined,
          }"
        >
          <div class="max-h-[50vh] overflow-auto">
            <div
              v-for="item of items"
              :key="item.key"
              class="px-4 py-3 -outline-offset-1 transition-[background-color,box-shadow] first:rounded-t-xl last:rounded-b-xl hover:bg-gray-100 focus:bg-gray-100 active:shadow-inner dark:hover:bg-gray-800 dark:focus:bg-gray-800"
              data-test-id="dropdown-list-item"
              role="button"
              tabindex="0"
              :value="item.key"
              @click="(e) => selectItem(e, item)"
              @keydown.enter="(e) => selectItem(e, item)"
              @keydown.space="(e) => selectItem(e, item)"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
