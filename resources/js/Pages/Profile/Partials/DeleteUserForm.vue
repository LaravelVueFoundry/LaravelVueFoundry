<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { nextTick, ref } from 'vue'
import { Button, Heading, Input, Label } from '@local/ui'
import InputError from '@/Components/InputError.vue'
import Modal from '@/Components/Modal.vue'

const confirmingUserDeletion = ref(false)
const passwordInput = ref<HTMLInputElement | null>(null)

const form = useForm({
  password: '',
})

function confirmUserDeletion() {
  confirmingUserDeletion.value = true

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
  confirmingUserDeletion.value = false

  form.reset()
}
</script>

<template>
  <section>
    <header>
      <Heading type="h2">
        Delete Account
      </Heading>

      <p>
        Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
        your account, please download any data or information that you wish to retain.
      </p>
    </header>

    <Button variant="danger" @click="confirmUserDeletion">
      Delete Account
    </Button>

    <Modal :show="confirmingUserDeletion" @close="closeModal">
      <div>
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

        <div>
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
      </div>
    </Modal>
  </section>
</template>
