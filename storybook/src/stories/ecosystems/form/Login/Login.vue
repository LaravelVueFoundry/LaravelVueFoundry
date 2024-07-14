<script setup lang="ts">
import Card from '@/stories/atoms/containers/Card/Card.vue'
import Container from '@/stories/atoms/containers/Container/Container.vue'
import Button from '@/stories/atoms/form/Button/Button.vue'
import Checkbox from '@/stories/atoms/form/Checkbox/Checkbox.vue'
import Input from '@/stories/atoms/form/Input/Input.vue'
import Label from '@/stories/atoms/form/Label/Label.vue'
import Heading from '@/stories/atoms/typography/Heading/Heading.vue'
</script>

<template>
  <Container
    type="narrow"
  >
    <Card
      class="flex flex-col gap-8"
      wrapper-class="block"
    >
      <template #header>
        <Heading type="h2">
          Login form
        </Heading>
      </template>

      <div class="flex flex-col">
        <Label for="username">Username</Label>
        <Input id="username" name="username" placeholder="Username" />
      </div>

      <div class="flex flex-col">
        <Label for="password">Password</Label>
        <Input id="password" name="password" placeholder="Password" />
      </div>

      <Checkbox label="Remember me" name="remember" />

      <template #footer>
        <div
          class="flex items-center justify-between gap-8"
        >
          <a href="#">Forgot your password?</a>
          <Button variant="primary">
            Log in
          </Button>
        </div>
      </template>
    </Card>
  </Container>
</template>
