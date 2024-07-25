import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import InputGroup from "../InputGroup/InputGroup.vue"
import Label from "../Label/Label.vue"
import Component from "./FileUpload.vue"

type Props = ComponentProps<typeof Component>

const meta: Meta<Props> = {
  title: "Atoms/Form/FileUpload",
  component: Component,
  tags: ["autodocs"],
  args: {
    disabled: false,
    multiple: false,
    buttonText: "Choose a file",
    noFileText: "No file chosen",
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {
  args: {},
  render: (args) => {
    return {
      components: { Component, Label, InputGroup },
      setup() {
        return { args }
      },
      template: `<InputGroup><Label>Upload</Label><Component v-bind="args" /></InputGroup>`,
    }
  },
}
