import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component, { type Item } from "./Dropdown.vue"

type Props = ComponentProps<typeof Component>

function genOptions(num: number): Item[] {
  const options = []

  for (let i = 0; i < num; i++) {
    options.push({
      key: `item_${i}`,
      value: `Item ${i + 1}`,
    } satisfies Item)
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
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = { args: { items: genOptions(3) } }
export const ManyItems: Story = { args: { items: genOptions(100) } }

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
