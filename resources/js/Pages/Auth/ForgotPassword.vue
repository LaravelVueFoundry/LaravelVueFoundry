<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import { Button, Card, Container, Heading, Input, Label } from '@local/ui'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'

defineProps<{
  status?: string
}>()

const form = useForm({
  email: '',
})

function submit() {
  form.post(route('password.email'))
}
</script>

<template>
  <GuestLayout>
    <Head>
      <title>Forgot Password</title>
      <meta content="Forgot your password? No problem. You can reset it here." name="description">
    </Head>

    <Container type="narrow">
      <form @submit.prevent="submit">
        <Card
          class="flex flex-col gap-8"
        >
          <template #header>
            <Heading type="h4">
              Forgot password
            </Heading>
          </template>

          <div>
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset
            link that will allow you to choose a new one.
          </div>

          <div v-if="status">
            {{ status }}
          </div>

          <div class="flex flex-col">
            <Label for="email">Email</Label>

            <Input
              id="email"
              v-model="form.email"
              autocomplete="email"
              autofocus
              name="email"
              required
              type="email"
            />

            <InputError :message="form.errors.email" />
          </div>

          <template #footer>
            <Button
              :loading="form.processing"
              variant="primary"
            >
              Email Password Reset Link
            </Button>
          </template>
        </Card>
      </form>
    </Container>
  </GuestLayout>
</template>
