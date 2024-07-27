<script setup lang="ts">
import Card from "@/stories/atoms/container/Card/Card.vue"
import Container from "@/stories/atoms/container/Container/Container.vue"
import Button from "@/stories/atoms/form/Button/Button.vue"
import Checkbox from "@/stories/atoms/form/Checkbox/Checkbox.vue"
import Input from "@/stories/atoms/form/Input/Input.vue"
import InputGroup from "@/stories/atoms/form/InputGroup/InputGroup.vue"
import Label from "@/stories/atoms/form/Label/Label.vue"
import Heading from "@/stories/atoms/typography/Heading/Heading.vue"
import { Link } from "@inertiajs/vue3"
</script>

<template>
  <Container
    class=""
    type="narrow"
  >
    <Card>
      <Heading
        class="py-4 text-center"
        type="h2"
      >
        Login form
      </Heading>

      <InputGroup>
        <Label for="username">Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="Username"
        />
      </InputGroup>

      <InputGroup>
        <Label for="password">Password</Label>
        <Input
          id="password"
          name="password"
          placeholder="Password"
        />
      </InputGroup>

      <Checkbox
        label="Remember me"
        name="remember"
      />

      <template #footer>
        <div class="flex items-center justify-between gap-8">
          <Link href="#">Forgot your password?</Link>

          <Button variant="primary">Log in</Button>
        </div>
      </template>
    </Card>
  </Container>
</template>
