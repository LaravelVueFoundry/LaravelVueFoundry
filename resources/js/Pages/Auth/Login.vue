<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Button, Card, Checkbox, Container, Heading, Input, Label } from '@local/ui'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'

defineProps<{
  canResetPassword?: boolean
  status?: string
}>()

const form = useForm({
  email: '',
  password: '',
  remember: false,
})

function submit() {
  form.post(route('login'), {
    onFinish: () => {
      form.reset('password')
    },
  })
}
</script>

<template>
  <GuestLayout>
    <Container type="narrow">
      <Head title="Log in" />

      <form @submit.prevent="submit">
        <Card
          class="flex flex-col gap-8"
          wrapper-class="block"
        >
          <Heading type="h2">
            Log in
          </Heading>

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

          <div class="flex flex-col">
            <Label for="password">Password</Label>

            <Input
              id="password"
              v-model="form.password"
              autocomplete="current-password"
              name="password"
              required
              type="password"
            />

            <InputError :message="form.errors.password" />
          </div>

          <Checkbox v-model="form.remember" label="Remember me" name="remember" />

          <div class="flex items-center justify-between">
            <Link
              v-if="canResetPassword"
              :href="route('password.request')"
            >
              Forgot your password?
            </Link>

            <Button :loading="form.processing">
              Log in
            </Button>
          </div>
        </Card>
      </form>
    </Container>
  </GuestLayout>
</template>
