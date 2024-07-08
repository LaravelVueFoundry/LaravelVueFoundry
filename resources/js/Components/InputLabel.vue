<script setup lang="ts">
defineProps<{
  value?: string
}>()
</script>

<template>
  <label>
    <slot />
  </label>
</template>
