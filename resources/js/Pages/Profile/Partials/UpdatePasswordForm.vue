<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import { Button } from '@local/ui'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import TextInput from '@/Components/TextInput.vue'

const passwordInput = ref<HTMLInputElement | null>(null)
const currentPasswordInput = ref<HTMLInputElement | null>(null)

const form = useForm({
  current_password: '',
  password: '',
  password_confirmation: '',
})

function updatePassword() {
  form.put(route('password.update'), {
    preserveScroll: true,
    onSuccess: () => {
      form.reset()
    },
    onError: () => {
      if (form.errors.password) {
        form.reset('password', 'password_confirmation')
        passwordInput.value?.focus()
      }
      if (form.errors.current_password) {
        form.reset('current_password')
        currentPasswordInput.value?.focus()
      }
    },
  })
}
</script>

<template>
  <section>
    <header>
      <h2>
        Update Password
      </h2>

      <p>
        Ensure your account is using a long, random password to stay secure.
      </p>
    </header>

    <form @submit.prevent="updatePassword">
      <div>
        <InputLabel for="current_password" value="Current Password" />

        <TextInput
          id="current_password"
          ref="currentPasswordInput"
          v-model="form.current_password"
          autocomplete="current-password"
          type="password"
        />

        <InputError :message="form.errors.current_password" />
      </div>

      <div>
        <InputLabel for="password" value="New Password" />

        <TextInput
          id="password"
          ref="passwordInput"
          v-model="form.password"
          autocomplete="new-password"
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
          type="password"
        />

        <InputError :message="form.errors.password_confirmation" />
      </div>

      <div>
        <Button :loading="form.processing">
          Save
        </Button>

        <p v-if="form.recentlySuccessful">
          Saved.
        </p>
      </div>
    </form>
  </section>
</template>
