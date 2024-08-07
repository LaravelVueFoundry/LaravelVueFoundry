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

const { locale, t } = useLocale()

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
      <title>
        {{ t("auth.confirm-pass.meta.title") }}
      </title>
      <meta
        content="Confirm your password to continue"
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
            {{ t("auth.confirm-pass.title") }}
          </Heading>

          <div>
            {{ t("auth.confirm-pass.intro") }}
          </div>

          <InputGroup>
            <Label for="password">
              {{ t("auth.confirm-pass.field.password") }}
            </Label>
            <Input
              id="password"
              v-model="form.password"
              autocomplete="current-password"
              autofocus
              name="password"
              :placeholder="
                t('auth.confirm-pass.field.password.placeholder').value
              "
              required
              type="password"
            />
            <InputError :message="form.errors.password" />
          </InputGroup>

          <template #footer>
            <div
              class="flex flex-row-reverse items-center justify-between gap-6 max-sm:flex-col max-sm:items-stretch"
            >
              <Button
                icon="mdi:lock-open-variant"
                :loading="form.processing"
                type="submit"
                variant="primary"
              >
                {{ t("auth.confirm-pass.submit") }}
              </Button>
            </div>
          </template>
        </Card>
      </form>
    </Container>
  </BaseLayout>
</template>
