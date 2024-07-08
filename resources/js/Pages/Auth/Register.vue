<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Button, Label } from '@local/ui'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import TextInput from '@/Components/TextInput.vue'

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
    <Head title="Register" />

    <form @submit.prevent="submit">
      <div>
        <Label for="name">Name</Label>

        <TextInput
          id="name"
          v-model="form.name"
          autocomplete="name"
          autofocus
          required
          type="text"
        />

        <InputError :message="form.errors.name" />
      </div>

      <div>
        <Label for="email">Email</Label>

        <TextInput
          id="email"
          v-model="form.email"
          autocomplete="username"
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
          autocomplete="new-password"
          required
          type="password"
        />

        <InputError :message="form.errors.password" />
      </div>

      <div>
        <Label for="password_confirmation">Confirm Password</Label>

        <TextInput
          id="password_confirmation"
          v-model="form.password_confirmation"
          autocomplete="new-password"
          required
          type="password"
        />

        <InputError :message="form.errors.password_confirmation" />
      </div>

      <div>
        <Link
          :href="route('login')"
        >
          Already registered?
        </Link>

        <Button :loading="form.processing">
          Register
        </Button>
      </div>
    </form>
  </GuestLayout>
</template>
