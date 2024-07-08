<script setup lang="ts">
import { Link, useForm, usePage } from '@inertiajs/vue3'
import { Button } from '@local/ui'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import TextInput from '@/Components/TextInput.vue'

defineProps<{
  mustVerifyEmail?: boolean
  status?: string
}>()

const user = usePage().props.auth.user

const form = useForm({
  name: user.name,
  email: user.email,
})
</script>

<template>
  <section>
    <header>
      <h2>
        Profile Information
      </h2>

      <p>
        Update your account's profile information and email address.
      </p>
    </header>

    <form @submit.prevent="form.patch(route('profile.update'))">
      <div>
        <InputLabel for="name" value="Name" />

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
        <InputLabel for="email" value="Email" />

        <TextInput
          id="email"
          v-model="form.email"
          autocomplete="username"
          required
          type="email"
        />

        <InputError :message="form.errors.email" />
      </div>

      <div v-if="mustVerifyEmail && user.email_verified_at === null">
        <p>
          Your email address is unverified.
          <Link
            as="button"
            :href="route('verification.send')"
            method="post"
          >
            Click here to re-send the verification email.
          </Link>
        </p>

        <div
          v-show="status === 'verification-link-sent'"
        >
          A new verification link has been sent to your email address.
        </div>
      </div>

      <div>
        <Button :disabled="form.processing">
          Save
        </Button>

        <p v-if="form.recentlySuccessful">
          Saved.
        </p>
      </div>
    </form>
  </section>
</template>
