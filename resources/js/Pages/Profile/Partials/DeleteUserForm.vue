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

const { locale, t } = useLocale()

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
      {{ t("profile.delete.title") }}
    </Heading>

    <p>
      {{ t("profile.delete.intro") }}
    </p>

    <template #footer>
      <Button
        class="me-auto"
        icon="mdi:bin-outline"
        variant="danger"
        @click="confirmUserDeletion"
      >
        {{ t("profile.delete.modal.button") }}
      </Button>
    </template>

    <Modal
      ref="modalRef"
      @on-close="closeModal"
    >
      <template #title>
        <Heading type="h4">
          {{ t("profile.delete.modal.heading") }}
        </Heading>
      </template>

      <div class="flex flex-col gap-4">
        <Heading type="h2">
          {{ t("profile.delete.modal.title") }}
        </Heading>

        <p>
          {{ t("profile.delete.modal.intro") }}
        </p>

        <InputGroup>
          <Label
            for="password"
            required
          >
            {{ t("profile.delete.modal.field.password") }}
          </Label>

          <Input
            id="password"
            ref="passwordInput"
            v-model="form.password"
            name="password"
            :placeholder="
              t('profile.delete.modal.field.password.placeholder').value
            "
            required
            type="password"
            @keyup.enter="deleteUser"
          />

          <InputError :message="form.errors.password" />
        </InputGroup>
      </div>

      <template #actions>
        <div class="flex items-center justify-between">
          <Button @click="closeModal">
            {{ t("profile.delete.modal.cancel") }}
          </Button>

          <Button
            icon="mdi:bin-outline"
            :loading="form.processing"
            variant="danger"
            @click="deleteUser"
          >
            {{ t("profile.delete.modal.submit") }}
          </Button>
        </div>
      </template>
    </Modal>
  </Card>
</template>
