import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Login.vue"

type Props = ComponentProps<typeof Component> & { default: string }

const meta: Meta<Props> = {
  title: "Ecosystems/Form/Login",
  component: Component,
  parameters: {
    slots: {
      default: {},
    },
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {}
