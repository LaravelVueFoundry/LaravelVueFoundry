<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { Container } from '@local/ui'
import DeleteUserForm from './Partials/DeleteUserForm.vue'
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'

defineProps<{
  mustVerifyEmail?: boolean
  status?: string
}>()
</script>

<template>
  <Head>
    <title>Profile</title>
    <meta content="Edit your user profile" name="description">
  </Head>

  <AuthenticatedLayout>
    <Container
      class="flex flex-col gap-8"
      type="narrow"
    >
      <UpdateProfileInformationForm
        :must-verify-email="mustVerifyEmail"
        :status="status"
      />

      <UpdatePasswordForm />

      <DeleteUserForm />
    </Container>
  </AuthenticatedLayout>
</template>
