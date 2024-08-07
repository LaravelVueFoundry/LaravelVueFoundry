<script setup lang="ts">
import BaseLayout from "@/Layouts/BaseLayout.vue"
import { useLocale } from "@/composables/useLocale"
import { Head, Link, useForm } from "@inertiajs/vue3"
import {
  Button,
  Card,
  Checkbox,
  Container,
  Heading,
  Input,
  InputError,
  InputGroup,
  Label,
} from "@local/ui"

defineProps<{
  canResetPassword?: boolean
  status?: string
}>()

const { locale, t } = useLocale()

const form = useForm({
  email: "",
  password: "",
  remember: false,
})

function submit() {
  form.post(route("login", { lang: locale }), {
    onFinish: () => {
      form.reset("password")
    },
  })
}
</script>

<template>
  <BaseLayout>
    <Head>
      <title>{{ t("auth.login.meta.title") }}</title>
      <meta
        :content="t('auth.login.meta.description').value"
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
            {{ t("auth.login.title") }}
          </Heading>

          <div v-if="status">
            {{ status }}
          </div>

          <InputGroup>
            <Label for="email">{{ t("auth.login.field.email") }}</Label>

            <Input
              id="email"
              v-model="form.email"
              autocomplete="email"
              autofocus
              name="email"
              :placeholder="t('auth.login.field.email.placeholder').value"
              required
              type="email"
            />

            <InputError :message="form.errors.email" />
          </InputGroup>

          <InputGroup>
            <Label for="password">{{ t("auth.login.field.password") }}</Label>

            <Input
              id="password"
              v-model="form.password"
              autocomplete="current-password"
              name="password"
              :placeholder="t('auth.login.field.password.placeholder').value"
              required
              type="password"
            />

            <InputError :message="form.errors.password" />
          </InputGroup>

          <Checkbox
            v-model="form.remember"
            :label="t('auth.login.field.remember').value"
            name="remember"
          />

          <template #footer>
            <div
              class="flex flex-row-reverse items-center justify-between gap-6 max-sm:flex-col max-sm:items-stretch"
            >
              <Button
                icon="mdi:login"
                :loading="form.processing"
                type="submit"
                variant="primary"
              >
                {{ t("auth.login.submit") }}
              </Button>

              <Link
                v-if="canResetPassword"
                as="button"
                class="p-2 text-center"
                :href="route('password.request', { lang: locale })"
              >
                {{ t("auth.login.forgot-pass") }}
              </Link>
            </div>
          </template>
        </Card>
      </form>
    </Container>
  </BaseLayout>
</template>
