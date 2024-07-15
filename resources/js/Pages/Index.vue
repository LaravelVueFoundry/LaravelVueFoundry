<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { Card, Container } from '@local/ui'
import BaseLayout from '@/Layouts/BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <Head>
      <title>Welcome</title>
      <meta content="Homepage" name="description">
    </Head>

    <Container type="narrow">
      <Card>
        <p>INDEX</p>
      </Card>
    </Container>
  </BaseLayout>
</template>
