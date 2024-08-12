<script setup lang="ts">
import Button from "@/stories/atoms/form/Button/Button.vue"
import { twMerge } from "tailwind-merge"
import { type HTMLAttributes, ref } from "vue"

withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    buttonText?: string
    noFileText?: string
    disabled?: boolean
    multiple?: boolean
  }>(),
  {
    class: undefined,
    buttonText: "Choose a file",
    noFileText: "No file chosen",
  },
)

const fileList = ref<FileList | null>(null)
const fileUploadRef = ref<HTMLInputElement | null>(null)

function onFileChosen(e: Event) {
  fileList.value = (e.target as HTMLInputElement).files

  emit("update:modelValue", fileList.value)
}

function pickFile() {
  fileUploadRef.value?.click()
}

function clear() {
  ;(fileUploadRef.value as HTMLInputElement).value = ""
  fileList.value = null
}

const emit = defineEmits(["update:modelValue"])
defineExpose({ clear })
</script>

<template>
  <div class="relative">
    <input
      ref="fileUploadRef"
      class="hidden"
      data-test-id="file-upload-input"
      :multiple="multiple"
      type="file"
      @change="onFileChosen"
    />

    <div
      :class="
        twMerge(
          'flex items-center gap-4 rounded-xl border border-gray-300 bg-white shadow-inner transition-[background,border,box-shadow,color,opacity,outline] focus:shadow-md dark:border-gray-700 dark:bg-gray-950',
          $props.class,
        )
      "
      data-test-id="file-upload-wrapper"
      @click="() => !$props.disabled && pickFile()"
    >
      <Button
        class="flex-shrink-0 rounded-e-none"
        :disabled="disabled"
        icon="mdi:upload"
        size="square"
        type="button"
        variant="primary"
        @click.stop.prevent="pickFile"
      >
        {{ buttonText }}
      </Button>

      <p
        v-if="fileList?.length"
        :class="
          twMerge(
            'flex-1 overflow-hidden text-ellipsis text-nowrap transition-colors',
            disabled ? 'cursor-default text-gray-500' : 'cursor-pointer',
          )
        "
      >
        <template
          v-for="(file, index) of fileList"
          :key="`${file.name}${file.size}`"
        >
          <template v-if="index > 0">, </template>{{ file.name }}
        </template>
      </p>

      <p
        v-else
        :class="
          twMerge(
            'flex-1 overflow-hidden text-ellipsis text-nowrap pe-4 text-gray-500',
            disabled ? 'cursor-default' : 'cursor-pointer',
          )
        "
      >
        {{ noFileText }}
      </p>

      <Transition
        appear
        enter-active-class="transition-opacity"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <Button
          v-if="fileList?.length"
          class="flex-shrink-0 rounded-s-none"
          data-test-id="file-upload-clear"
          :disabled="disabled"
          icon="mdi:bin-outline"
          size="square"
          type="button"
          variant="danger"
          @click.stop="clear"
        />
      </Transition>
    </div>
  </div>
</template>
