<script setup lang="ts">
import { usePage } from '@inertiajs/vue3'
import { Header } from '@local/ui'
import { computed } from 'vue'

const page = usePage()

const linksPrimary: InstanceType<typeof Header>['$props']['linksPrimary'] = []

const linksSecondary = computed<InstanceType<typeof Header>['$props']['linksSecondary']>(() => {
  const result = []

  if (page.props.auth.user) {
    result.push({
      title: 'Dashboard',
      href: route('dashboard'),
    })

    result.push({
      title: 'Profile',
      href: route('profile.edit'),
    })

    result.push({
      title: 'Log out',
      href: route('logout'),
    })
  }
  else {
    result.push({
      title: 'Log in',
      href: route('login'),
    })

    result.push({
      title: 'Register',
      href: route('register'),
    })
  }

  return result
})
</script>

<template>
  <Header :links-primary="linksPrimary" :links-secondary="linksSecondary" title="Header" />

  <main id="main-content">
    <slot />
  </main>
</template>
