<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div v-show="message">
    <p>
      {{ message }}
    </p>
  </div>
</template>
