<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
</script>

<template>
  <Head title="Dashboard" />

  <AuthenticatedLayout>
    <div>
      You're logged in!
    </div>
  </AuthenticatedLayout>
</template>
