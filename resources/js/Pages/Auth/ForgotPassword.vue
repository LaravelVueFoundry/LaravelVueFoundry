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

defineProps<{
  status?: string
}>()

const { locale, t } = useLocale()

const form = useForm({
  email: "",
})

function submit() {
  form.post(route("password.email", { lang: locale }))
}
</script>

<template>
  <BaseLayout>
    <Head>
      <title>{{ t("auth.forgot-pass.meta.title") }}</title>
      <meta
        :content="t('auth.forgot-pass.meta.description').value"
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
            {{ t("auth.forgot-pass.title") }}
          </Heading>

          <div class="max-sm:text-justify">
            {{ t("auth.forgot-pass.intro") }}
          </div>

          <div v-if="status">
            {{ status }}
          </div>

          <InputGroup>
            <Label for="email">
              {{ t("auth.forgot-pass.field.email") }}
            </Label>

            <Input
              id="email"
              v-model="form.email"
              autocomplete="email"
              autofocus
              name="email"
              :placeholder="t('auth.forgot-pass.field.email.placeholder').value"
              required
              type="email"
            />

            <InputError :message="form.errors.email" />
          </InputGroup>

          <template #footer>
            <Button
              class="ms-auto flex max-sm:w-full"
              icon="mdi:key"
              :loading="form.processing"
              variant="primary"
            >
              {{ t("auth.forgot-pass.submit") }}
            </Button>
          </template>
        </Card>
      </form>
    </Container>
  </BaseLayout>
</template>
