<script setup lang="ts">
import BaseLayout from "@/Layouts/BaseLayout.vue"
import { useLocale } from "@/composables/useLocale"
import { Head, useForm } from "@inertiajs/vue3"
import { Button, Input, InputError, Label } from "@local/ui"

const { locale } = useLocale()

const form = useForm({
  password: "",
})

function submit() {
  form.post(route("password.confirm", { lang: locale }), {
    onFinish: () => {
      form.reset()
    },
  })
}
</script>

<template>
  <BaseLayout>
    <Head>
      <title>Confirm Password</title>
      <meta
        content="Confirm your password to continue"
        name="description"
      />
    </Head>

    <div>
      This is a secure area of the application. Please confirm your password
      before continuing.
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
        <Button :loading="form.processing"> Confirm </Button>
      </div>
    </form>
  </BaseLayout>
</template>
