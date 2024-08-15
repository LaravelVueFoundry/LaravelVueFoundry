<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
import BaseLayout from "@/Layouts/BaseLayout.vue"
import { Head } from "@inertiajs/vue3"
import { Container } from "@local/ui"
import DeleteUserForm from "./Partials/DeleteUserForm.vue"
import ProfileTabs from "./Partials/ProfileTabs.vue"
import UpdateAvatar from "./Partials/UpdateAvatar.vue"
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
      :content="t('profile.edit.meta.description').value"
      name="description"
    />
  </Head>

  <BaseLayout>
    <Container class="flex flex-col gap-4">
      <ProfileTabs />

      <div class="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-sm:gap-4">
        <div class="flex flex-col gap-8 max-sm:gap-4">
          <UpdateAvatar />

          <UpdateProfileInformationForm
            :must-verify-email="mustVerifyEmail"
            :status="status"
          />
        </div>

        <div class="flex flex-col gap-8 max-sm:gap-4">
          <UpdatePasswordForm />

          <DeleteUserForm />
        </div>
      </div>
    </Container>
  </BaseLayout>
</template>
