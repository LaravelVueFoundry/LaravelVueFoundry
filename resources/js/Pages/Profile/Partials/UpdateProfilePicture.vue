<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
import { Icon } from "@iconify/vue"
import { useForm } from "@inertiajs/vue3"
import {
  Avatar,
  Button,
  Card,
  FileUpload,
  Heading,
  InputError,
  InputGroup,
  Label,
  Modal,
  useToast,
} from "@local/ui"
import { ref } from "vue"

interface Form {
  image: File | null
}

const { locale, t } = useLocale()
const toastStore = useToast()

const profilePictureInput = ref<typeof FileUpload | null>(null)
const modalRef = ref<typeof Modal | null>(null)

const canDelete = ref(false)

const rnd = ref(Date.now())

const form = useForm<Form>({
  image: null,
})

function updateProfilePicture() {
  form.post(route("profile_picture.update", { lang: locale }), {
    preserveScroll: true,
    onSuccess: () => {
      toastStore.success(t("profile.update-avatar.submit.success").value)
      profilePictureInput.value?.clear()
      form.reset()

      rnd.value = Date.now()
    },
    onError: () => {},
  })
}

function deleteProfilePicture() {
  form.delete(route("profile_picture.delete", { lang: locale }), {
    preserveScroll: true,
    onSuccess: () => {
      toastStore.success(t("profile.update-avatar.delete.success").value)
      profilePictureInput.value?.clear()
      closeModal()

      canDelete.value = false
      rnd.value = Date.now()
    },
    onError: () => {},
  })
}

function confirmAvatarDeletion() {
  modalRef.value?.open()
}

function closeModal() {
  modalRef.value?.close()
  form.reset()
}
</script>

<template>
  <form @submit.prevent="updateProfilePicture">
    <Card>
      <Heading
        class="py-4 text-center"
        type="h2"
      >
        {{ t("profile.update-avatar.title") }}
      </Heading>

      <div class="relative mx-auto">
        <Avatar
          :name="$page.props.auth.user.name"
          :onload="() => (canDelete = true)"
          :src="`/avatars/${$page.props.auth.user.id}.png?r=${rnd}`"
        />

        <Button
          v-if="canDelete"
          class="absolute end-0 top-0 -translate-x-4 translate-y-4 rounded-full rtl:translate-x-4"
          size="square"
          :title="t('profile.update-avatar.delete').value"
          variant="danger"
          @click.prevent="confirmAvatarDeletion"
        >
          <Icon
            icon="mdi:close"
            ssr
          />
        </Button>
      </div>

      <InputGroup>
        <Label
          for="profile-picture"
          required
        >
          {{ t("profile.update-avatar.field.new-image.label") }}
        </Label>

        <FileUpload
          id="profile-picture"
          ref="profilePictureInput"
          :button-text="t('profile.update-avatar.field.new-image.btn').value"
          name="image"
          :no-file-text="
            t('profile.update-avatar.field.new-image.nofile').value
          "
          required
          @input="form.image = $event.target.files[0]"
        />
        <InputError :message="form.errors.image" />
      </InputGroup>

      <template #footer>
        <div>
          <Button
            icon="mdi:content-save-outline"
            :loading="form.processing"
            type="submit"
            variant="primary"
          >
            {{ t("profile.update-avatar.submit") }}
          </Button>
        </div>
      </template>
    </Card>

    <Modal
      ref="modalRef"
      @on-close="closeModal"
    >
      <template #title>
        <Heading type="h4">
          {{ t("profile.update-avatar.delete.modal.heading") }}
        </Heading>
      </template>

      <div class="flex flex-col gap-4">
        <p>
          {{ t("profile.update-avatar.delete.modal.intro") }}
        </p>
      </div>

      <template #actions>
        <div class="flex items-center justify-between">
          <Button @click="closeModal">
            {{ t("profile.update-avatar.delete.modal.cancel") }}
          </Button>

          <Button
            icon="mdi:bin-outline"
            :loading="form.processing"
            variant="danger"
            @click="deleteProfilePicture"
          >
            {{ t("profile.update-avatar.delete.modal.submit") }}
          </Button>
        </div>
      </template>
    </Modal>
  </form>
</template>
