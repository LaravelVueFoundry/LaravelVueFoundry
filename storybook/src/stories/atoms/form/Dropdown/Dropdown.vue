<script setup lang="ts">
import Image from "@/stories/atoms/base/Image/Image.vue"
import { Icon } from "@iconify/vue"
import { onClickOutside, onKeyDown, useElementBounding } from "@vueuse/core"
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap"
import { twMerge } from "tailwind-merge"
import { computed, ref, watch, type HTMLAttributes } from "vue"

export interface DropdownItem {
  prefix?: {
    type: "icon" | "image"
    value: string
  }
  key?: number | string
  value: unknown
}

const props = withDefaults(
  defineProps<{
    wrapperClass?: HTMLAttributes["class"]
    class?: HTMLAttributes["class"]
    default?: number | string
    disabled?: boolean
    direction?: "down" | "up"
    placeholder?: string
    items?: DropdownItem[]
    required?: boolean
  }>(),
  {
    wrapperClass: undefined,
    class: undefined,
    default: undefined,
    direction: "down",
    placeholder: "",
    items: undefined,
  },
)

const dropdownWrapperRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const dropdownListRef = ref<HTMLElement | null>(null)
const dropdownListInnerRef = ref<HTMLElement | null>(null)

const { y: listY } = useElementBounding(dropdownRef)
const { height: listHeight } = useElementBounding(dropdownListRef)

const isOpen = ref(false)
const selectedItem = ref<DropdownItem | undefined>(
  props.items?.find((item) => item.key === props.default),
)

const { activate: ftActivate, deactivate: ftDeactivate } = useFocusTrap(
  dropdownWrapperRef,
  {
    allowOutsideClick: true,
  },
)

const items = computed(() => {
  if (!props.items) return
  if (props.required) return props.items

  return [
    {
      key: undefined,
      value: props.placeholder,
    },
    ...props.items,
  ]
})

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
  if (isOpen.value) {
    close()
    return
  }

  open()
}

onClickOutside(dropdownWrapperRef, close)

function selectItem(e: Event, item: DropdownItem | string | number) {
  close()
  emit("change", e)
  emit("selectItem", item)

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
      ref="dropdownRef"
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
      <span
        v-if="selectedItem"
        class="flex items-center gap-3"
      >
        <Icon
          v-if="selectedItem.prefix && selectedItem.prefix.type === 'icon'"
          class="size-5"
          :icon="selectedItem.prefix?.value"
          ssr
        />

        {{ selectedItem.value }}
      </span>
      <template v-else-if="props.placeholder">
        <span class="text-gray-700 dark:text-gray-400">
          {{ props.placeholder }}
        </span>
      </template>
      <template v-else-if="!props.placeholder"><span>&nbsp;</span></template>

      <Icon
        :class="
          twMerge(
            'size-5 transition-transform',
            isOpen && '-scale-y-100',
            direction === 'up' && 'rotate-180',
          )
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
        :class="
          twMerge(
            'absolute end-0 start-0',
            direction === 'up' && listY - 16 > listHeight && 'bottom-14',
            direction === 'up' && listY - 16 <= listHeight && 'top-0',
            direction === 'down' &&
              listY + (dropdownRef?.offsetHeight || 0) + 16 <= listHeight &&
              'top-14',
            direction === 'down' &&
              !dropdownListInnerRef?.classList.contains('top-14') &&
              listY + (dropdownRef?.offsetHeight || 0) + 16 > listHeight &&
              'bottom-0',
          )
        "
        data-test-id="dropdown-list"
      >
        <div
          ref="dropdownListRef"
          class="overflow-hidden rounded-xl border bg-white shadow-md dark:border-gray-800 dark:bg-gray-900"
        >
          <div class="max-h-[50vh] overflow-auto">
            <div
              v-for="item of items"
              :key="item.key"
              class="flex items-center gap-3 px-4 py-3 -outline-offset-1 transition-[background-color,box-shadow] first:rounded-t-xl last:rounded-b-xl hover:bg-gray-100 focus:bg-gray-100 active:shadow-inner dark:hover:bg-gray-800 dark:focus:bg-gray-800"
              data-test-id="dropdown-list-item"
              role="button"
              tabindex="0"
              :value="item.key"
              @click="(e) => selectItem(e, item)"
              @keydown.enter="(e) => selectItem(e, item)"
              @keydown.space="(e) => selectItem(e, item)"
            >
              <Icon
                v-if="item.prefix && item.prefix.type === 'icon'"
                class="size-5"
                data-test-id="dropdown-list-icon"
                :icon="item.prefix?.value"
                ssr
              />

              <Image
                v-if="item.prefix && item.prefix.type === 'image'"
                alt=""
                class="size-5"
                data-test-id="dropdown-list-image"
                :height="20"
                :src="item.prefix.value"
                :width="20"
              />

              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
