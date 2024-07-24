import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Input.vue"

type Props = ComponentProps<typeof Component>

const meta: Meta<Props> = {
  title: "Atoms/Form/Input",
  component: Component,
  tags: ["autodocs"],
  args: {
    autocomplete: undefined,
    formnovalidate: false,
    maxlength: undefined,
    placeholder: "Placeholder...",
    required: false,
  },
  argTypes: {
    type: {
      options: [
        "email",
        "number",
        "password",
        "search",
        "tel",
        "text",
        "url",
        "textarea",
      ],
    },
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {
  args: {
    autofocus: false,
    disabled: false,
    name: "default",
    type: "text",
  },
}

export const Disabled: Story = {
  args: {
    autofocus: false,
    disabled: true,
    name: "disabled",
    type: "text",
  },
}

export const Autofocus: Story = {
  args: {
    autofocus: true,
    disabled: false,
    name: "autofocus",
    type: "text",
  },
}

export const Textarea: Story = {
  args: {
    autofocus: false,
    disabled: false,
    name: "textarea",
    type: "textarea",
  },
}

export const Prefilled: Story = {
  args: {
    autofocus: false,
    disabled: false,
    name: "textarea",
    type: "textarea",
    modelValue: "Pre-filled value",
  },
}

export const VModel: Story = {
  args: {
    autofocus: false,
    disabled: false,
    name: "autofocus",
    type: "text",
  },
  render: (args) => {
    return {
      components: { Component },
      setup() {
        const inputValue = ref("v-model")
        return { args, inputValue }
      },
      template: `<Component v-model="inputValue" v-bind="args" /><br /><p>{{ inputValue }}</p>`,
    }
  },
}
