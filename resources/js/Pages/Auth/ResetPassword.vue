<script setup lang="ts">
import BaseLayout from "@/Layouts/BaseLayout.vue"
import { useLocale } from "@/composables/useLocale"
import { Head, useForm } from "@inertiajs/vue3"
import {
  Button,
  Card,
  Container,
  Heading,
  Input,
  InputError,
  InputGroup,
  Label,
} from "@local/ui"

const props = defineProps<{
  email: string
  token: string
}>()

const { locale, t } = useLocale()

const form = useForm({
  token: props.token,
  email: props.email,
  password: "",
  password_confirmation: "",
})

function submit() {
  form.post(route("password.store", { lang: locale }), {
    onFinish: () => {
      form.reset("password", "password_confirmation")
    },
  })
}
</script>

<template>
  <BaseLayout>
    <Head>
      <title>
        {{ t("auth.reset-pass.meta.title") }}
      </title>
      <meta
        :content="t('auth.reset-pass.meta.title').value"
        name="description"
      />
    </Head>

    <Container
      class="content-center"
      type="narrow"
    >
      <form @submit.prevent="submit">
        <Card>
          <Heading
            class="py-4 text-center"
            type="h2"
          >
            {{ t("auth.reset-pass.title") }}
          </Heading>

          <InputGroup>
            <Label for="email">
              {{ t("auth.reset-pass.field.email") }}
            </Label>

            <Input
              id="email"
              v-model="form.email"
              autocomplete="email"
              autofocus
              name="email"
              :placeholder="t('auth.reset-pass.field.email.placeholder').value"
              required
              type="email"
            />

            <InputError :message="form.errors.email" />
          </InputGroup>

          <InputGroup>
            <Label for="password">
              {{ t("auth.reset-pass.field.password") }}
            </Label>

            <Input
              id="password"
              v-model="form.password"
              autocomplete="new-password"
              name="password"
              :placeholder="
                t('auth.reset-pass.field.password.placeholder').value
              "
              required
              type="password"
            />

            <InputError :message="form.errors.password" />
          </InputGroup>

          <InputGroup>
            <Label for="password_confirmation">
              {{ t("auth.reset-pass.field.password-confirm") }}
            </Label>

            <Input
              id="password_confirmation"
              v-model="form.password_confirmation"
              autocomplete="new-password"
              name="new-password"
              :placeholder="
                t('auth.reset-pass.field.password-confirm.placeholder').value
              "
              required
              type="password"
            />

            <InputError :message="form.errors.password_confirmation" />
          </InputGroup>

          <template #footer>
            <div
              class="flex flex-row-reverse items-center justify-between gap-6 max-sm:flex-col max-sm:items-stretch"
            >
              <Button
                icon="mdi:form-textbox-password"
                :loading="form.processing"
                type="submit"
                variant="primary"
              >
                {{ t("auth.reset-pass.submit") }}
              </Button>
            </div>
          </template>
        </Card>
      </form>
    </Container>
  </BaseLayout>
</template>
