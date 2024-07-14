<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import { Button, Card, Heading, Input, InputGroup, Label } from '@local/ui'
import InputError from '@/Components/InputError.vue'

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
  <form
    @submit.prevent="updatePassword"
  >
    <Card>
      <template #header>
        <Heading type="h4">
          Update Password
        </Heading>
      </template>

      <p>
        Ensure your account is using a long, random password to stay secure.
      </p>

      <InputGroup>
        <Label for="current_password">Current Password</Label>

        <Input
          id="current_password"
          ref="currentPasswordInput"
          v-model="form.current_password"
          autocomplete="current-password"
          name="password"
          type="password"
        />

        <InputError :message="form.errors.current_password" />
      </InputGroup>

      <InputGroup>
        <Label for="password">New Password</Label>

        <Input
          id="password"
          ref="passwordInput"
          v-model="form.password"
          autocomplete="new-password"
          name="new-password"
          type="password"
        />

        <InputError :message="form.errors.password" />
      </InputGroup>

      <InputGroup>
        <Label for="password_confirmation">Confirm Password</Label>

        <Input
          id="password_confirmation"
          v-model="form.password_confirmation"
          autocomplete="new-password"
          name="new-password"
          type="password"
        />

        <InputError :message="form.errors.password_confirmation" />
      </InputGroup>

      <template #footer>
        <div>
          <Button
            :loading="form.processing"
            variant="primary"
          >
            Save
          </Button>

          <p v-if="form.recentlySuccessful">
            Saved.
          </p>
        </div>
      </template>
    </Card>
  </form>
</template>
