<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
import BaseLayout from "@/Layouts/BaseLayout.vue"
import { Head } from "@inertiajs/vue3"
import { Container } from "@local/ui"
import DeleteUserForm from "./Partials/DeleteUserForm.vue"
import UpdatePasswordForm from "./Partials/UpdatePasswordForm.vue"
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm.vue"

defineProps<{
  mustVerifyEmail?: boolean
  status?: string
}>()

const { t } = useLocale()
</script>

<template>
  <Head>
    <title>{{ t("profile.edit.meta.title") }}</title>
    <meta
      :content="t('profile.edit.meta.description')"
      name="description"
    />
  </Head>

  <BaseLayout>
    <Container
      class="flex flex-col gap-8 max-sm:gap-4"
      type="narrow"
    >
      <UpdateProfileInformationForm
        :must-verify-email="mustVerifyEmail"
        :status="status"
      />

      <UpdatePasswordForm />

      <DeleteUserForm />
    </Container>
  </BaseLayout>
</template>
