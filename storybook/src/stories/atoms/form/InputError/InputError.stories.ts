import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./InputError.vue"

type Props = ComponentProps<typeof Component>

const meta: Meta<Props> = {
  title: "Atoms/Form/InputError",
  component: Component,
  tags: ["autodocs"],
  args: {
    message: "Input error",
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {}
