<script setup lang="ts">
import { Link, useForm, usePage } from "@inertiajs/vue3"
import {
  Button,
  Card,
  Heading,
  Input,
  InputError,
  InputGroup,
  Label,
} from "@local/ui"

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
  <form @submit.prevent="form.patch(route('profile.update'))">
    <Card>
      <Heading
        class="py-4 text-center"
        type="h2"
      >
        Profile Information
      </Heading>

      <p>Update your account's profile information and email address.</p>

      <InputGroup>
        <Label
          for="name"
          required
          >Name</Label
        >

        <Input
          id="name"
          v-model="form.name"
          autocomplete="name"
          autofocus
          name="name"
          placeholder="John Doe"
          required
          type="text"
        />

        <InputError :message="form.errors.name" />
      </InputGroup>

      <InputGroup>
        <Label
          for="email"
          required
        >
          Email
        </Label>

        <Input
          id="email"
          v-model="form.email"
          autocomplete="username"
          name="email"
          placeholder="info@example.com"
          required
          type="email"
        />

        <InputError :message="form.errors.email" />
      </InputGroup>

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

        <div v-show="status === 'verification-link-sent'">
          A new verification link has been sent to your email address.
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between">
          <Button
            icon="mdi:content-save-outline"
            :loading="form.processing"
            variant="primary"
          >
            Save
          </Button>

          <p v-if="form.recentlySuccessful">Saved.</p>
        </div>
      </template>
    </Card>
  </form>
</template>
