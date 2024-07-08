<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import { Button } from '@local/ui'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import TextInput from '@/Components/TextInput.vue'

const props = defineProps<{
  email: string
  token: string
}>()

const form = useForm({
  token: props.token,
  email: props.email,
  password: '',
  password_confirmation: '',
})

function submit() {
  form.post(route('password.store'), {
    onFinish: () => {
      form.reset('password', 'password_confirmation')
    },
  })
}
</script>

<template>
  <GuestLayout>
    <Head title="Reset Password" />

    <form @submit.prevent="submit">
      <div>
        <InputLabel for="email" value="Email" />

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
        <InputLabel for="password" value="Password" />

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
        <InputLabel for="password_confirmation" value="Confirm Password" />

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
        <Button :loading="form.processing">
          Reset Password
        </Button>
      </div>
    </form>
  </GuestLayout>
</template>
