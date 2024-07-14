<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { nextTick, ref } from 'vue'
import { Button, Card, Heading, Input, InputError, Label, Modal } from '@local/ui'

const modalRef = ref<typeof Modal | null>(null)
const passwordInput = ref<HTMLInputElement | null>(null)

const form = useForm({
  password: '',
})

function confirmUserDeletion() {
  modalRef.value?.open()

  nextTick(() => passwordInput.value?.focus())
}

function deleteUser() {
  form.delete(route('profile.destroy'), {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    onError: () => passwordInput.value?.focus(),
    onFinish: () => {
      form.reset()
    },
  })
}

function closeModal() {
  modalRef.value?.close()
  form.reset()
}
</script>

<template>
  <Card>
    <template #header>
      <Heading type="h4">
        Delete Account
      </Heading>
    </template>

    <p>
      Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
      your account, please download any data or information that you wish to retain.
    </p>

    <template #footer>
      <Button
        class="me-auto"
        variant="danger"
        @click="confirmUserDeletion"
      >
        Delete Account
      </Button>
    </template>

    <Modal
      ref="modalRef"
      @on-close="closeModal"
    >
      <template #title>
        <Heading type="h4">
          Delete your account?
        </Heading>
      </template>

      <div
        class="flex flex-col gap-4"
      >
        <Heading type="h2">
          Are you sure you want to delete your account?
        </Heading>

        <p>
          Once your account is deleted, all of its resources and data will be permanently deleted. Please
          enter your password to confirm you would like to permanently delete your account.
        </p>

        <div>
          <Label for="password">Password</Label>

          <Input
            id="password"
            ref="passwordInput"
            v-model="form.password"
            name="password"
            placeholder="Password"
            type="password"
            @keyup.enter="deleteUser"
          />

          <InputError :message="form.errors.password" />
        </div>
      </div>

      <template #actions>
        <div
          class="flex items-center justify-between"
        >
          <Button @click="closeModal">
            Cancel
          </Button>

          <Button
            :loading="form.processing"
            variant="danger"
            @click="deleteUser"
          >
            Delete Account
          </Button>
        </div>
      </template>
    </Modal>
  </Card>
</template>
