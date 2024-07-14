<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { Card, Container } from '@local/ui'
import GuestLayout from '@/Layouts/GuestLayout.vue'
</script>

<template>
  <GuestLayout>
    <Head>
      <title>Welcome</title>
      <meta content="Homepage" name="description">
    </Head>

    <Container type="narrow">
      <Card>
        <p>INDEX</p>
      </Card>
    </Container>
  </GuestLayout>
</template>
