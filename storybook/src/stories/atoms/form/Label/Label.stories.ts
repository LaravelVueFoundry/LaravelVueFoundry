import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Label.vue"

type Props = ComponentProps<typeof Component> & { default: string }

const meta: Meta<Props> = {
  title: "Atoms/Form/Label",
  component: Component,
  tags: ["autodocs"],
  args: {
    default: "Label",
  },
  parameters: {
    slots: {
      default: {},
    },
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {
  args: {
    required: false,
  },
}

export const Required: Story = {
  args: {
    required: true,
  },
}
