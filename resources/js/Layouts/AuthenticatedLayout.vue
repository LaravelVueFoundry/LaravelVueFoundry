<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <div>
    <Link :active="route().current('dashboard')" :href="route('dashboard')">
      Dashboard
    </Link>
    <Link :href="route('profile.edit')">
      Profile
    </Link>
    <Link as="button" :href="route('logout')" method="post">
      Log Out
    </Link>

    <main id="main-content">
      <slot />
    </main>
  </div>
</template>
