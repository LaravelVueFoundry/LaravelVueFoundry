<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import { Button, Input, Label } from '@local/ui'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'

const form = useForm({
  password: '',
})

function submit() {
  form.post(route('password.confirm'), {
    onFinish: () => {
      form.reset()
    },
  })
}
</script>

<template>
  <GuestLayout>
    <Head title="Confirm Password" />

    <div>
      This is a secure area of the application. Please confirm your password before continuing.
    </div>

    <form @submit.prevent="submit">
      <div>
        <Label for="password">Password</Label>
        <Input
          id="password"
          v-model="form.password"
          autocomplete="current-password"
          autofocus
          name="password"
          required
          type="password"
        />
        <InputError :message="form.errors.password" />
      </div>

      <div>
        <Button :loading="form.processing">
          Confirm
        </Button>
      </div>
    </form>
  </GuestLayout>
</template>
