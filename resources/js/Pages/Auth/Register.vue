<script setup lang="ts">
import BaseLayout from "@/Layouts/BaseLayout.vue"
import { useLocale } from "@/composables/useLocale"
import { Head, Link, useForm } from "@inertiajs/vue3"
import {
  Button,
  Card,
  Container,
  Heading,
  Input,
  InputError,
  InputGroup,
  Label,
  PasswordStrength,
} from "@local/ui"

const form = useForm({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
})

const { locale, t } = useLocale()

function submit() {
  form.post(
    route("register", {
      lang: locale,
    }),
    {
      onFinish: () => {
        form.reset("password", "password_confirmation")
      },
    },
  )
}
</script>

<template>
  <BaseLayout>
    <Head>
      <title>{{ t("auth.register.meta.title") }}</title>
      <meta
        :content="t('auth.register.meta.description').value"
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
            {{ t("auth.register.title") }}
          </Heading>

          <InputGroup>
            <Label for="name">{{ t("auth.register.field.name") }}</Label>

            <Input
              id="name"
              v-model="form.name"
              autocomplete="name"
              autofocus
              name="name"
              :placeholder="t('auth.register.field.name.placeholder').value"
              required
              type="text"
            />

            <InputError :message="form.errors.name" />
          </InputGroup>

          <InputGroup>
            <Label for="email">{{ t("auth.register.field.email") }}</Label>

            <Input
              id="email"
              v-model="form.email"
              autocomplete="email"
              name="email"
              :placeholder="t('auth.register.field.email.placeholder').value"
              required
              type="email"
            />

            <InputError :message="form.errors.email" />
          </InputGroup>

          <InputGroup>
            <Label for="password">{{
              t("auth.register.field.password")
            }}</Label>

            <Input
              id="password"
              v-model="form.password"
              autocomplete="new-password"
              name="password"
              :placeholder="t('auth.register.field.password.placeholder').value"
              required
              type="password"
            />

            <PasswordStrength
              class="-mb-5"
              :password="form.password"
            />

            <InputError :message="form.errors.password" />
          </InputGroup>

          <InputGroup>
            <Label for="password_confirmation">{{
              t("auth.register.field.password-confirm")
            }}</Label>

            <Input
              id="password_confirmation"
              v-model="form.password_confirmation"
              autocomplete="new-password"
              name="new-password"
              :placeholder="
                t('auth.register.field.password-confirm.placeholder').value
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
                icon="mdi:register"
                :loading="form.processing"
                variant="primary"
              >
                {{ t("auth.register.submit") }}
              </Button>

              <Link
                as="button"
                class="p-2 text-center"
                :href="route('login', { lang: locale })"
              >
                {{ t("auth.register.login") }}
              </Link>
            </div>
          </template>
        </Card>
      </form>
    </Container>
  </BaseLayout>
</template>
