<script setup lang="ts">
import BaseLayout from "@/Layouts/BaseLayout.vue"
import { Head, Link, useForm } from "@inertiajs/vue3"
import {
  Button,
  Card,
  Checkbox,
  Container,
  Heading,
  Input,
  InputError,
  InputGroup,
  Label,
} from "@local/ui"

defineProps<{
  canResetPassword?: boolean
  status?: string
}>()

const form = useForm({
  email: "",
  password: "",
  remember: false,
})

function submit() {
  form.post(route("login"), {
    onFinish: () => {
      form.reset("password")
    },
  })
}
</script>

<template>
  <BaseLayout>
    <Container type="narrow">
      <Head>
        <title>Log in</title>
        <meta
          content="Log in to your account"
          name="description"
        />
      </Head>

      <form @submit.prevent="submit">
        <Card>
          <Heading
            class="pt-4 text-center"
            type="h2"
          >
            Log in
          </Heading>

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

          <Checkbox
            v-model="form.remember"
            label="Remember me"
            name="remember"
          />

          <template #footer>
            <div
              class="flex flex-row-reverse items-center justify-between gap-6 max-sm:flex-col max-sm:items-stretch"
            >
              <Button
                icon="mdi:login"
                :loading="form.processing"
                type="submit"
                variant="primary"
              >
                Log in
              </Button>

              <Link
                v-if="canResetPassword"
                class="p-2 text-center"
                :href="route('password.request')"
              >
                Forgot your password?
              </Link>
            </div>
          </template>
        </Card>
      </form>
    </Container>
  </BaseLayout>
</template>
