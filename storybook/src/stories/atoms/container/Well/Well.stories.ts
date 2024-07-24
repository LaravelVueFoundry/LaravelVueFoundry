import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Well.vue"

type Props = ComponentProps<typeof Component> & { default: string }

const meta: Meta<Props> = {
  title: "Atoms/Container/Well",
  component: Component,
  tags: ["autodocs"],
  args: {
    default: "Well",
    size: "md",
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
  args: {},
}

export const Small: Story = {
  args: {
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
  },
}
