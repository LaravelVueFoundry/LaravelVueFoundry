import Img from "@/stories/assets/test-20x20.jpg"
import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component, { type DropdownItem } from "./Dropdown.vue"

type Props = ComponentProps<typeof Component>

function genOptions(
  num: number,
  prefix?: DropdownItem["prefix"],
): DropdownItem[] {
  const options = []

  for (let i = 0; i < num; i++) {
    options.push({
      prefix,
      key: `item_${i}`,
      value: `Item ${i + 1}`,
    } satisfies DropdownItem)
  }

  return options
}

const meta: Meta<Props> = {
  title: "Atoms/Form/Dropdown",
  component: Component,
  tags: ["autodocs"],
  args: {
    disabled: false,
    placeholder: "Placeholder...",
    required: false,
  },
  argTypes: {
    direction: {
      control: {
        type: "inline-radio",
      },
      options: ["down", "up"],
    },
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = { args: { items: genOptions(3) } }
export const ManyItems: Story = { args: { items: genOptions(100) } }

export const Icons: Story = {
  args: {
    items: genOptions(100, {
      type: "icon",
      value: "mdi:account",
    }),
  },
}

export const Images: Story = {
  args: {
    items: genOptions(100, {
      type: "image",
      value: Img,
    }),
  },
}

export const ScrollingPage: Story = {
  args: {
    items: genOptions(100),
  },
  render: (args) => {
    return {
      components: { Component },
      setup() {
        return { args }
      },
      template: `<div class="h-screen" /><Component v-bind="args" /><div class="h-screen" />`,
    }
  },
}

export const Dropup: Story = {
  args: {
    direction: "up",
    items: genOptions(100),
  },
  render: (args) => {
    return {
      components: { Component },
      setup() {
        return { args }
      },
      template: `<div class="h-[calc(100vh-2rem)] flex flex-col-reverse"><Component v-bind="args" /></div>`,
    }
  },
}
