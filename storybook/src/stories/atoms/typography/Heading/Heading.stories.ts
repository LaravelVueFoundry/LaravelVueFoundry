import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Heading.vue"

type Props = ComponentProps<typeof Component> & { default: string }

const meta: Meta<Props> = {
  title: "Atoms/Typography/Heading",
  component: Component,
  tags: ["autodocs"],
  args: {
    default: "Heading",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
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

export const Heading1: Story = { args: { type: "h1" } }
export const Heading2: Story = { args: { type: "h2" } }
export const Heading3: Story = { args: { type: "h3" } }
export const Heading4: Story = { args: { type: "h4" } }
export const Heading5: Story = { args: { type: "h5" } }
export const Heading6: Story = { args: { type: "h6" } }
