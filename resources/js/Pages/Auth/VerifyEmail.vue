<script setup lang="ts">
import { computed } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Button } from '@local/ui'
import GuestLayout from '@/Layouts/GuestLayout.vue'

const props = defineProps<{
  status?: string
}>()

const form = useForm({})

function submit() {
  form.post(route('verification.send'))
}

const verificationLinkSent = computed(() => props.status === 'verification-link-sent')
</script>

<template>
  <GuestLayout>
    <Head>
      <title>Email Verification</title>
      <meta content="Verify your email address" name="description">
    </Head>

    <div>
      Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
      we just emailed to you? If you didn't receive the email, we will gladly send you another.
    </div>

    <div v-if="verificationLinkSent">
      A new verification link has been sent to the email address you provided during registration.
    </div>

    <form @submit.prevent="submit">
      <div>
        <Button :loading="form.processing">
          Resend Verification Email
        </Button>

        <Link
          as="button"
          :href="route('logout')"
          method="post"
        >
          Log Out
        </Link>
      </div>
    </form>
  </GuestLayout>
</template>
