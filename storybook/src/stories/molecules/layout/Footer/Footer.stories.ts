import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Footer.vue"

type Props = ComponentProps<typeof Component>

const meta: Meta<Props> = {
  title: "Molecules/Layout/Footer",
  component: Component,
  tags: ["autodocs"],
  args: {
    siteName: "Site name",
    menus: [
      {
        title: "Menu 1",
        items: [
          {
            icon: "mdi:calendar",
            title: "Link 1",
            href: "/",
          },
          {
            icon: "mdi:calendar",
            title: "Link 2",
            href: "/",
          },
        ],
      },
      {
        title: "Menu 2",
        items: [
          {
            icon: "mdi:account",
            title: "Link 1",
            href: "/",
          },
          {
            icon: "mdi:account",
            title: "Link 2",
            href: "/",
          },
        ],
      },
    ],
    socials: [
      {
        icon: "mdi:github",
        title: "GitHub",
        href: "https://github.com/LaravelVueFoundry/LaravelVueFoundry",
      },
    ],
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {
  render: (args) => {
    return {
      components: { Component },
      setup() {
        return { args }
      },
      template: `<div class="-m-4"><Component v-bind="args" /></div>`,
    }
  },
}
