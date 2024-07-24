import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Checkbox.vue"

type Props = ComponentProps<typeof Component>

const meta: Meta<Props> = {
  title: "Atoms/Form/Checkbox",
  component: Component,
  tags: ["autodocs"],
  args: {},
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
    label: "Option",
    name: "default",
    required: false,
  },
}

export const VModel: Story = {
  args: {
    label: "Option",
    name: "default",
    required: false,
  },
  render: (args) => {
    return {
      components: { Component },
      setup() {
        const selected = ref(true)
        return { args, selected }
      },
      template: `<Component v-model="selected" v-bind="args" /><br /><p>{{ selected }}</p>`,
    }
  },
}
