<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
import { Link, useForm, usePage } from "@inertiajs/vue3"
import {
  Button,
  Card,
  Heading,
  Input,
  InputError,
  InputGroup,
  Label,
  useToast,
} from "@local/ui"

defineProps<{
  mustVerifyEmail?: boolean
  status?: string
}>()

const { locale, t } = useLocale()
const toastStore = useToast()

const user = usePage().props.auth.user

const form = useForm({
  name: user.name,
  email: user.email,
})

const submit = () => {
  form.patch(route("profile.update", { lang: locale }), {
    onSuccess: () => {
      toastStore.success(t("profile.info.submit.success").value)
    },
  })
}
</script>

<template>
  <form @submit.prevent="submit">
    <Card>
      <Heading
        class="py-4 text-center"
        type="h2"
      >
        {{ t("profile.info.title") }}
      </Heading>

      <p>{{ t("profile.info.intro") }}</p>

      <InputGroup>
        <Label
          for="name"
          required
        >
          {{ t("profile.info.field.name") }}
        </Label>

        <Input
          id="name"
          v-model="form.name"
          autocomplete="name"
          autofocus
          name="name"
          :placeholder="t('profile.info.field.name.placeholder').value"
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
          {{ t("profile.info.field.email") }}
        </Label>

        <Input
          id="email"
          v-model="form.email"
          autocomplete="username"
          name="email"
          :placeholder="t('profile.info.field.email.placeholder').value"
          required
          type="email"
        />

        <InputError :message="form.errors.email" />
      </InputGroup>

      <div v-if="mustVerifyEmail && user.email_verified_at === null">
        <p>
          {{ t("profile.info.email.unverified") }}

          <Link
            as="button"
            :href="route('verification.send', { lang: locale })"
            method="post"
          >
            {{ t("profile.info.email.verify-resend") }}
          </Link>
        </p>

        <div v-show="status === 'verification-link-sent'">
          {{ t("profile.info.email.verify-sent") }}
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between">
          <Button
            icon="mdi:content-save-outline"
            :loading="form.processing"
            variant="primary"
          >
            {{ t("profile.info.submit") }}
          </Button>
        </div>
      </template>
    </Card>
  </form>
</template>
