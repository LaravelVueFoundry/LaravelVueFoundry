import Input from "@/stories/atoms/form/Input/Input.vue"
import Label from "@/stories/atoms/form/Label/Label.vue"
import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./InputGroup.vue"

type Props = ComponentProps<typeof Component> & { default: string }

const meta: Meta<Props> = {
  title: "Atoms/Form/InputGroup",
  component: Component,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {
  render: (args) => {
    return {
      components: { Component, Label, Input },
      setup() {
        return { args }
      },
      template: `
        <Component>
        <Label for="input">Label</Label>
        <Input name="input" />
        </Component>
      `,
    }
  },
}
