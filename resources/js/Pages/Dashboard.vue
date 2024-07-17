<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3'
import { Container, Heading } from '@local/ui'
import BaseLayout from '@/Layouts/BaseLayout.vue'

const page = usePage()
</script>

<template>
  <Head>
    <title>Dashboard</title>
    <meta content="The user dashboard" name="description">
  </Head>

  <BaseLayout>
    <Container
      class="flex flex-col gap-4"
    >
      <Heading type="h2">
        Welcome, {{ page.props.auth.user.name }}!
      </Heading>

      <p>You're logged in!</p>
    </Container>
  </BaseLayout>
</template>
