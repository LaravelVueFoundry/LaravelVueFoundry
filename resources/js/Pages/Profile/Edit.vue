<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
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
  <Head title="Profile" />

  <AuthenticatedLayout>
    <div>
      <div>
        <div>
          <UpdateProfileInformationForm
            :must-verify-email="mustVerifyEmail"
            :status="status"
          />
        </div>

        <div>
          <UpdatePasswordForm />
        </div>

        <div>
          <DeleteUserForm />
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
