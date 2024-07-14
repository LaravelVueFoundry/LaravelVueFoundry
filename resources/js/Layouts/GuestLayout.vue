<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <div>
    <Link
      :href="route('home')"
    >
      Home
    </Link>

    <Link
      v-if="$page.props.auth.user"
      :href="route('dashboard')"
    >
      Dashboard
    </Link>

    <template v-else>
      <Link
        :href="route('login')"
      >
        Log in
      </Link>

      <Link
        :href="route('register')"
      >
        Register
      </Link>
    </template>

    <main id="main-content">
      <slot />
    </main>
  </div>
</template>
