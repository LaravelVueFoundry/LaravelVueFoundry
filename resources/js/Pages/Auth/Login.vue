<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Button, Card, Checkbox, Container, Heading, Input, InputError, InputGroup, Label } from '@local/ui'
import BaseLayout from '@/Layouts/BaseLayout.vue'

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
  <BaseLayout>
    <Container type="narrow">
      <Head>
        <title>Log in</title>
        <meta content="Log in to your account" name="description">
      </Head>

      <form @submit.prevent="submit">
        <Card>
          <template #header>
            <Heading type="h2">
              Log in
            </Heading>
          </template>

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
              autocomplete="current-password"
              name="password"
              required
              type="password"
            />

            <InputError :message="form.errors.password" />
          </InputGroup>

          <Checkbox v-model="form.remember" label="Remember me" name="remember" />

          <template #footer>
            <div class="flex items-center justify-between">
              <Link
                v-if="canResetPassword"
                :href="route('password.request')"
              >
                Forgot your password?
              </Link>

              <Button :loading="form.processing" type="submit" variant="primary">
                Log in
              </Button>
            </div>
          </template>
        </Card>
      </form>
    </Container>
  </BaseLayout>
</template>
