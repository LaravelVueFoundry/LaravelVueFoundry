<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
import { useForm } from "@inertiajs/vue3"
import {
  Button,
  Card,
  Heading,
  Input,
  InputError,
  InputGroup,
  Label,
  Modal,
} from "@local/ui"
import { nextTick, ref } from "vue"

const { locale } = useLocale()

const modalRef = ref<typeof Modal | null>(null)
const passwordInput = ref<HTMLInputElement | null>(null)

const form = useForm({
  password: "",
})

function confirmUserDeletion() {
  modalRef.value?.open()

  nextTick(() => passwordInput.value?.focus())
}

function deleteUser() {
  form.delete(route("profile.destroy", { lang: locale }), {
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
    <Heading
      class="py-4 text-center"
      type="h2"
    >
      Delete Account
    </Heading>

    <p>
      Once your account is deleted, all of its resources and data will be
      permanently deleted. Before deleting your account, please download any
      data or information that you wish to retain.
    </p>

    <template #footer>
      <Button
        class="me-auto"
        icon="mdi:bin-outline"
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
        <Heading type="h4"> Delete your account? </Heading>
      </template>

      <div class="flex flex-col gap-4">
        <Heading type="h2">
          Are you sure you want to delete your account?
        </Heading>

        <p>
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Please enter your password to confirm you would
          like to permanently delete your account.
        </p>

        <InputGroup>
          <Label
            for="password"
            required
            >Password</Label
          >

          <Input
            id="password"
            ref="passwordInput"
            v-model="form.password"
            name="password"
            required
            type="password"
            @keyup.enter="deleteUser"
          />

          <InputError :message="form.errors.password" />
        </InputGroup>
      </div>

      <template #actions>
        <div class="flex items-center justify-between">
          <Button @click="closeModal"> Cancel </Button>

          <Button
            icon="mdi:bin-outline"
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
