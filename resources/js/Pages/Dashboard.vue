<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { Card, Container, Heading } from '@local/ui'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
</script>

<template>
  <Head>
    <title>Dashboard</title>
    <meta content="The user dashboard" name="description">
  </Head>

  <AuthenticatedLayout>
    <Container type="narrow">
      <Card>
        <template #header>
          <Heading type="h4">
            Welcome, {{ $page.props.auth.user.name }}!
          </Heading>
        </template>

        <p>You're logged in!</p>
      </Card>
    </Container>
  </AuthenticatedLayout>
</template>
