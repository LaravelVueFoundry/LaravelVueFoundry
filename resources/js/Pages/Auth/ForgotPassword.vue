<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import { Button, Card, Container, Heading, Input, InputError, InputGroup, Label } from '@local/ui'
import { Icon } from '@iconify/vue'
import BaseLayout from '@/Layouts/BaseLayout.vue'

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
  <BaseLayout>
    <Head>
      <title>Forgot Password</title>
      <meta content="Forgot your password? No problem. You can reset it here." name="description">
    </Head>

    <Container type="narrow">
      <form @submit.prevent="submit">
        <Card>
          <Heading class="pt-4 text-center" type="h2">
            Forgot password
          </Heading>

          <div
            class="max-sm:text-justify"
          >
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset
            link that will allow you to choose a new one.
          </div>

          <div v-if="status">
            {{ status }}
          </div>

          <InputGroup>
            <Label for="email">Email</Label>

            <Input
              id="email"
              v-model="form.email"
              autocomplete="email"
              autofocus
              name="email"
              placeholder="info@example.com"
              required
              type="email"
            />

            <InputError :message="form.errors.email" />
          </InputGroup>

          <template #footer>
            <Button
              class="ms-auto flex max-sm:w-full"
              :loading="form.processing"
              variant="primary"
            >
              <Icon
                class="size-6"
                icon="mdi:key"
                ssr
              />
              Reset password
            </Button>
          </template>
        </Card>
      </form>
    </Container>
  </BaseLayout>
</template>
