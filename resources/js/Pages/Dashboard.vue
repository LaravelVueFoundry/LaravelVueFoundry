<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3'
import { Card, Container, Heading } from '@local/ui'
import BaseLayout from '@/Layouts/BaseLayout.vue'

const page = usePage()
</script>

<template>
  <Head>
    <title>Dashboard</title>
    <meta content="The user dashboard" name="description">
  </Head>

  <BaseLayout>
    <Container type="narrow">
      <Card>
        <template #header>
          <Heading type="h4">
            Welcome, {{ page.props.auth.user.name }}!
          </Heading>
        </template>

        <p>You're logged in!</p>
      </Card>
    </Container>
  </BaseLayout>
</template>
