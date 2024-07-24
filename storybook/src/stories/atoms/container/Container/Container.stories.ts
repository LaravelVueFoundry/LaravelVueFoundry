import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Container.vue"

type Props = ComponentProps<typeof Component> & { default: string }

const meta: Meta<Props> = {
  title: "Atoms/Container/Container",
  component: Component,
  tags: ["autodocs"],
  args: {
    class:
      "[background-image:repeating-linear-gradient(-55deg,#0002,#0002_20px,#ffb10122_20px,#ffb10122_40px)]",
    default: "Container",
    type: "regular",
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["regular", "wide", "narrow", "full"],
    },
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

export const Wide: Story = {
  args: {
    type: "wide",
  },
}

export const Narrow: Story = {
  args: {
    type: "narrow",
  },
}

export const Full: Story = {
  args: {
    type: "full",
  },
}
