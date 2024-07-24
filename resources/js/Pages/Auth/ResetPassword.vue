<script setup lang="ts">
import BaseLayout from "@/Layouts/BaseLayout.vue"
import { Head, useForm } from "@inertiajs/vue3"
import { Button, Input, InputError, Label } from "@local/ui"

const props = defineProps<{
  email: string
  token: string
}>()

const form = useForm({
  token: props.token,
  email: props.email,
  password: "",
  password_confirmation: "",
})

function submit() {
  form.post(route("password.store"), {
    onFinish: () => {
      form.reset("password", "password_confirmation")
    },
  })
}
</script>

<template>
  <BaseLayout>
    <Head>
      <title>Reset Password</title>
      <meta
        content="Reset your password"
        name="description"
      />
    </Head>

    <form @submit.prevent="submit">
      <div>
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

      <div>
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

      <div>
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

      <div>
        <Button :loading="form.processing"> Reset Password </Button>
      </div>
    </form>
  </BaseLayout>
</template>
