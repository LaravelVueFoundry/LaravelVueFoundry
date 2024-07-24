import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Checkboxes.vue"

type Props = ComponentProps<typeof Component>

const meta: Meta<Props> = {
  title: "Atoms/Form/Checkboxes",
  component: Component,
  tags: ["autodocs"],
  args: {},
  parameters: {
    slots: {
      default: {},
    },
  },
}

function getOptions(number: number) {
  const options = []

  for (let i = 0; i < number; i++) {
    options.push({
      label: `Option ${i + 1}`,
    })
  }

  return options
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {
  args: {
    name: "default",
    options: getOptions(3),
    required: false,
  },
  render: (args) => {
    return {
      components: { Component },
      setup() {
        const selected = ref([0, 2])
        return { args, selected }
      },
      template: `<Component v-model="selected" v-bind="args" />`,
    }
  },
}

export const VModel: Story = {
  args: {
    name: "default",
    options: getOptions(5),
    required: false,
  },
  render: (args) => {
    return {
      components: { Component },
      setup() {
        const selected = ref([0, 2])
        return { args, selected }
      },
      template: `<Component v-model="selected" v-bind="args" /><br /><p>{{ selected }}</p>`,
    }
  },
}
