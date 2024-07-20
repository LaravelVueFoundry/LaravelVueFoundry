<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Button, Card, Container, Heading, Input, InputError, InputGroup, Label, PasswordStrength } from '@local/ui'
import BaseLayout from '@/Layouts/BaseLayout.vue'

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

function submit() {
  form.post(route('register'), {
    onFinish: () => {
      form.reset('password', 'password_confirmation')
    },
  })
}
</script>

<template>
  <BaseLayout>
    <Head>
      <title>Register</title>
      <meta content="Register a new account" name="description">
    </Head>

    <Container
      class="content-center"
      type="narrow"
    >
      <form @submit.prevent="submit">
        <Card>
          <Heading class="pt-4 text-center" type="h2">
            Register
          </Heading>

          <InputGroup>
            <Label for="name">Name</Label>

            <Input
              id="name"
              v-model="form.name"
              autocomplete="name"
              autofocus
              name="name"
              placeholder="John Doe"
              required
              type="text"
            />

            <InputError :message="form.errors.name" />
          </InputGroup>

          <InputGroup>
            <Label for="email">Email</Label>

            <Input
              id="email"
              v-model="form.email"
              autocomplete="email"
              name="email"
              placeholder="info@example.com"
              required
              type="email"
            />

            <InputError :message="form.errors.email" />
          </InputGroup>

          <InputGroup>
            <Label for="password">Password</Label>

            <Input
              id="password"
              v-model="form.password"
              autocomplete="new-password"
              name="password"
              required
              type="password"
            />

            <PasswordStrength class="-mb-5" :password="form.password" />

            <InputError :message="form.errors.password" />
          </InputGroup>

          <InputGroup>
            <Label for="password_confirmation">Confirm Password</Label>

            <Input
              id="password_confirmation"
              v-model="form.password_confirmation"
              autocomplete="new-password"
              name="new-password"
              required
              type="password"
            />

            <InputError :message="form.errors.password_confirmation" />
          </InputGroup>

          <template #footer>
            <div
              class="flex flex-row-reverse items-center justify-between gap-6 max-sm:flex-col max-sm:items-stretch"
            >
              <Button
                icon="mdi:register"
                :loading="form.processing"
                variant="primary"
              >
                Register
              </Button>

              <Link
                class="p-2 text-center"
                :href="route('login')"
              >
                Already registered?
              </Link>
            </div>
          </template>
        </Card>
      </form>
    </Container>
  </BaseLayout>
</template>
