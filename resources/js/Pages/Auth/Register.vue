<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Button, Card, Container, Heading, Input, Label } from '@local/ui'
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
        <Card
          class="flex flex-col gap-8"
          wrapper-class="block"
        >
          <template #header>
            <Heading type="h4">
              Register
            </Heading>
          </template>

          <div class="flex flex-col">
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
          </div>

          <div class="flex flex-col">
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
          </div>

          <div class="flex flex-col">
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
          </div>

          <div class="flex flex-col">
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
          </div>

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
