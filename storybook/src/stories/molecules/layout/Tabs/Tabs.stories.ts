import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Tabs.vue"

type Props = ComponentProps<typeof Component>

const meta: Meta<Props> = {
  title: "Molecules/Layout/Tabs",
  component: Component,
  tags: ["autodocs"],
  args: {
    items: [
      {
        icon: "mdi:account",
        title: "Tab 1",
        href: "#",
      },
      {
        icon: "mdi:graph",
        title: "Tab 2",
        href: "#",
      },
      {
        title: "Tab 3",
        href: "#",
      },
      {
        title: "Tab 4",
        href: "#",
      },
      {
        title: "Tab 5",
        href: "#",
      },
    ],
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {
  args: {},
}
