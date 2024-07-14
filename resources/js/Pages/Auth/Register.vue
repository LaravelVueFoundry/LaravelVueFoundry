<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Button, Card, Container, Heading, Input, InputGroup, Label } from '@local/ui'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'

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
  <GuestLayout>
    <Head>
      <title>Register</title>
      <meta content="Register a new account" name="description">
    </Head>

    <Container type="narrow">
      <form @submit.prevent="submit">
        <Card>
          <template #header>
            <Heading type="h4">
              Register
            </Heading>
          </template>

          <InputGroup>
            <Label for="name">Name</Label>

            <Input
              id="name"
              v-model="form.name"
              autocomplete="name"
              autofocus
              name="name"
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
              class="flex items-center justify-between"
            >
              <Link
                :href="route('login')"
              >
                Already registered?
              </Link>

              <Button
                :loading="form.processing"
                variant="primary"
              >
                Register
              </Button>
            </div>
          </template>
        </Card>
      </form>
    </Container>
  </GuestLayout>
</template>
