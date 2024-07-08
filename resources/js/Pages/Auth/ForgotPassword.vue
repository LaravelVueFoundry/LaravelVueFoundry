<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import { Button, Label } from '@local/ui'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import TextInput from '@/Components/TextInput.vue'

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
    <Head title="Forgot Password" />

    <div>
      Forgot your password? No problem. Just let us know your email address and we will email you a password reset
      link that will allow you to choose a new one.
    </div>

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
        <Button :loading="form.processing">
          Email Password Reset Link
        </Button>
      </div>
    </form>
  </GuestLayout>
</template>
