<script setup lang="ts">
import BaseLayout from "@/Layouts/BaseLayout.vue"
import { Head } from "@inertiajs/vue3"
import { Container, Heading } from "@local/ui"
</script>

<template>
  <BaseLayout>
    <Head>
      <title>Welcome</title>
      <meta
        content="Homepage"
        name="description"
      />
    </Head>

    <Container class="flex flex-col gap-4">
      <Heading type="h2">Home</Heading>

      <p>Homepage</p>
    </Container>
  </BaseLayout>
</template>
