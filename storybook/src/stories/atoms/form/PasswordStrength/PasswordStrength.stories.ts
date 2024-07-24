import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"
import type { ComponentProps } from "vue-component-type-helpers"
import Input from "../Input/Input.vue"
import InputGroup from "../InputGroup/InputGroup.vue"
import Label from "../Label/Label.vue"
import Component from "./PasswordStrength.vue"

type Props = ComponentProps<typeof Component> & { default: string }

const meta: Meta<Props> = {
  title: "Atoms/Form/PasswordStrength",
  component: Component,
  tags: ["autodocs"],
  render: (args) => {
    return {
      components: { Component, InputGroup, Label, Input },
      setup() {
        const model = ref("")
        return { args, model }
      },
      template: `
        <InputGroup>
          <Label for="password" required>Password</Label>
          <Input autocomplete="off" autofill="off" data-bwignore id="password" name="password" required type="password" v-model="model" />
          <Component v-bind="args" :password="model" />
        </InputGroup>
      `,
    }
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {
  args: {},
}
