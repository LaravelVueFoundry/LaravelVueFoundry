<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
import { useForm } from "@inertiajs/vue3"
import {
  Button,
  Card,
  Heading,
  Input,
  InputError,
  InputGroup,
  Label,
  PasswordStrength,
  useToast,
} from "@local/ui"
import { ref } from "vue"

const { locale, t } = useLocale()
const toastStore = useToast()

const passwordInput = ref<HTMLInputElement | null>(null)
const currentPasswordInput = ref<HTMLInputElement | null>(null)

const form = useForm({
  current_password: "",
  password: "",
  password_confirmation: "",
})

function updatePassword() {
  form.put(route("password.update", { lang: locale }), {
    preserveScroll: true,
    onSuccess: () => {
      form.reset()
      toastStore.success(t("profile.update-pass.submit.success").value)
    },
    onError: () => {
      if (form.errors.password) {
        form.reset("password", "password_confirmation")
        passwordInput.value?.focus()
      }

      if (form.errors.current_password) {
        form.reset("current_password")
        currentPasswordInput.value?.focus()
      }
    },
  })
}
</script>

<template>
  <form @submit.prevent="updatePassword">
    <Card>
      <Heading
        class="py-4 text-center"
        type="h2"
      >
        {{ t("profile.update-pass.title") }}
      </Heading>

      <p>
        {{ t("profile.update-pass.intro") }}
      </p>

      <InputGroup>
        <Label for="current_password">
          {{ t("profile.update-pass.field.pass-current") }}
        </Label>

        <Input
          id="current_password"
          ref="currentPasswordInput"
          v-model="form.current_password"
          autocomplete="current-password"
          name="password"
          :placeholder="
            t('profile.update-pass.field.pass-current.placeholder').value
          "
          type="password"
        />

        <InputError :message="form.errors.current_password" />
      </InputGroup>

      <InputGroup>
        <Label for="password">
          {{ t("profile.update-pass.field.pass-new") }}
        </Label>

        <Input
          id="password"
          ref="passwordInput"
          v-model="form.password"
          autocomplete="new-password"
          name="new-password"
          :placeholder="
            t('profile.update-pass.field.pass-new.placeholder').value
          "
          type="password"
        />

        <PasswordStrength
          class="-mb-5"
          :password="form.password"
        />

        <InputError :message="form.errors.password" />
      </InputGroup>

      <InputGroup>
        <Label for="password_confirmation">
          {{ t("profile.update-pass.field.pass-confirm") }}
        </Label>

        <Input
          id="password_confirmation"
          v-model="form.password_confirmation"
          autocomplete="password-confirm"
          name="password-confirm"
          :placeholder="
            t('profile.update-pass.field.pass-confirm.placeholder').value
          "
          type="password"
        />

        <InputError :message="form.errors.password_confirmation" />
      </InputGroup>

      <template #footer>
        <div>
          <Button
            icon="mdi:content-save-outline"
            :loading="form.processing"
            variant="primary"
          >
            {{ t("profile.update-pass.submit") }}
          </Button>
        </div>
      </template>
    </Card>
  </form>
</template>
