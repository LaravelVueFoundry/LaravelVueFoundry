import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Avatar.vue"

import MockImgAvatar from "./__mocks__/avatar.png"

type Props = ComponentProps<typeof Component>

const meta: Meta<Props> = {
  title: "Molecules/User/Avatar",
  component: Component,
  tags: ["autodocs"],
  args: {
    name: "Some User",
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
    src: MockImgAvatar,
  },
}

export const NoAvatar: Story = {
  args: {},
}
