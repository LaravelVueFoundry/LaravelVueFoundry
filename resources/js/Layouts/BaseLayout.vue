<script setup lang="ts">
import { usePage } from '@inertiajs/vue3'
import { Header } from '@local/ui'
import { computed } from 'vue'

const page = usePage()

const links = computed(() => {
  const result = []
  result.push({
    title: 'Home',
    href: route('home'),
  })

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
  <Header :links="links" title="Header" />

  <main id="main-content">
    <slot />
  </main>
</template>
