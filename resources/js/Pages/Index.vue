<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { Container, Heading } from '@local/ui'
import BaseLayout from '@/Layouts/BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <Head>
      <title>Welcome</title>
      <meta content="Homepage" name="description">
    </Head>

    <Container
      class="gap-4 flex flex-col"
    >
      <Heading type="h2">Home</Heading>
      <p>Homepage</p>
    </Container>
  </BaseLayout>
</template>
