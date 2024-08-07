<script setup lang="ts">
import BaseLayout from "@/Layouts/BaseLayout.vue"
import { useLocale } from "@/composables/useLocale"
import { Head, Link, useForm } from "@inertiajs/vue3"
import { Button, Card, Container } from "@local/ui"
import { computed } from "vue"

const props = defineProps<{
  status?: string
}>()

const { locale, t } = useLocale()
const form = useForm({})

function submit() {
  form.post(route("verification.send", { lang: locale }))
}

const verificationLinkSent = computed(
  () => props.status === "verification-link-sent",
)
</script>

<template>
  <BaseLayout>
    <Head>
      <title>
        {{ t("auth.verify.meta.title") }}
      </title>
      <meta
        :content="t('auth.verify.meta.description').value"
        name="description"
      />
    </Head>

    <Container
      class="content-center"
      type="narrow"
    >
      <form @submit.prevent="submit">
        <Card>
          <div>
            {{ t("auth.verify.intro") }}
          </div>

          <div v-if="verificationLinkSent">
            {{ t("auth.verify.success") }}
          </div>

          <template #footer>
            <div
              class="flex flex-row-reverse items-center justify-between gap-6 max-sm:flex-col max-sm:items-stretch"
            >
              <Button
                icon="mdi:envelope-open"
                :loading="form.processing"
                type="submit"
                variant="primary"
              >
                {{ t("auth.verify.submit") }}
              </Button>

              <Link
                as="button"
                class="p-2 text-center"
                :href="route('logout', { lang: locale })"
              >
                {{ t("auth.verify.logout") }}
              </Link>
            </div>
          </template>
        </Card>
      </form>
    </Container>
  </BaseLayout>
</template>
