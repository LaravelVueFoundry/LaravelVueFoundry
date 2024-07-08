<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Button, Label } from '@local/ui'
import Checkbox from '@/Components/Checkbox.vue'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import TextInput from '@/Components/TextInput.vue'

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
    <Head title="Log in" />

    <div v-if="status">
      {{ status }}
    </div>

    <form @submit.prevent="submit">
      <div>
        <Label for="email">Email</Label>

        <TextInput
          id="email"
          v-model="form.email"
          autocomplete="username"
          autofocus
          required
          type="email"
        />

        <InputError :message="form.errors.email" />
      </div>

      <div>
        <Label for="password">Password</Label>

        <TextInput
          id="password"
          v-model="form.password"
          autocomplete="current-password"
          required
          type="password"
        />

        <InputError :message="form.errors.password" />
      </div>

      <div>
        <label>
          <Checkbox v-model:checked="form.remember" name="remember" />
          <span>Remember me</span>
        </label>
      </div>

      <div>
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
    </form>
  </GuestLayout>
</template>
