<script setup lang="ts">
const props = withDefaults(defineProps<{
  required?: boolean
}>(), {
})
</script>

<template>
  <label class="block text-sm font-medium dark:text-white">
    <slot />

    <span
      v-if="props.required"
      class="text-danger-500"
    >
      *
    </span>
  </label>
</template>
