<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
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
  useToast,
} from "@local/ui"
import { ref } from "vue"

interface Form {
  image: File | null
}

const { locale, t } = useLocale()
const toastStore = useToast()

const profilePictureInput = ref<typeof FileUpload | null>(null)

const form = useForm<Form>({
  image: null,
})

function updateProfilePicture() {
  form.post(route("profile_picture.update", { lang: locale }), {
    preserveScroll: true,
    onSuccess: () => {
      toastStore.success(t("profile.update-profile-pic.submit.success").value)
      profilePictureInput.value?.clear()
      form.reset()
    },
    onError: () => {},
  })
}
</script>

<template>
  <form @submit.prevent="updateProfilePicture">
    <Card>
      <Heading
        class="py-4 text-center"
        type="h2"
      >
        {{ t("profile.update-profile-pic.title") }}
      </Heading>

      <InputGroup>
        <Avatar
          :name="$page.props.auth.user.name"
          :src="`/avatars/${$page.props.auth.user.id}.png`"
        />

        <Label
          for="profile-picture"
          required
        >
          {{ t("profile.update-profile-pic.field.new-image.label") }}
        </Label>

        <FileUpload
          id="profile-picture"
          ref="profilePictureInput"
          :button-text="
            t('profile.update-profile-pic.field.new-image.btn').value
          "
          name="image"
          :no-file-text="
            t('profile.update-profile-pic.field.new-image.nofile').value
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
            {{ t("profile.update-profile-pic.submit") }}
          </Button>
        </div>
      </template>
    </Card>
  </form>
</template>
