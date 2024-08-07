<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
import BaseLayout from "@/Layouts/BaseLayout.vue"
import { Head, usePage } from "@inertiajs/vue3"
import { Container, Heading } from "@local/ui"

const page = usePage()
const { t } = useLocale()
</script>

<template>
  <Head>
    <title>{{ t("profile.meta.title") }}</title>
    <meta
      :content="t('profile.meta.description').value"
      name="description"
    />
  </Head>

  <BaseLayout>
    <Container class="flex flex-col gap-4">
      <Heading type="h2">
        {{ t("profile.title", { name: page.props.auth.user.name }) }}
      </Heading>
    </Container>
  </BaseLayout>
</template>
