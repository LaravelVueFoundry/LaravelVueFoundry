import Button from "@/stories/atoms/form/Button/Button.vue"
import Heading from "@/stories/atoms/typography/Heading/Heading.vue"
import type { Meta, StoryObj } from "@storybook/vue3"
import { ref } from "vue"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Modal.vue"

type Props = ComponentProps<typeof Component> & {
  default: string
  title: string
}

const meta: Meta<Props> = {
  title: "Molecules/OffCanvas/Modal",
  component: Component,
  tags: ["autodocs"],
  args: {
    title: "Modal title",
  },
  parameters: {
    slots: {
      default: {},
      title: {},
    },
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {
  args: {
    default: "Modal",
  },
  render: (args) => {
    return {
      components: { Component, Button, Heading },
      setup() {
        const modalRef = ref<typeof Component | null>(null)
        const onClick = () => modalRef.value?.open()
        return { args, modalRef, onClick }
      },
      template: `
        <Button @click="onClick">Open modal</Button>
        <Component ref="modalRef">
          <template #title><Heading type="h4">{{ args.title }}</Heading></template>
          {{ args.default }}
        </Component>
      `,
    }
  },
}

export const PageOverflow: Story = {
  args: {
    default: "Page overflow modal contents",
  },
  render: (args) => {
    return {
      components: { Component, Button, Heading },
      setup() {
        const modalRef = ref<typeof Component | null>(null)
        const onClick = () => modalRef.value?.open()
        return { args, modalRef, onClick }
      },
      template: `
        <Button @click="onClick">Open modal</Button>
        <Component ref="modalRef">
          <template #title><Heading type="h4">{{ args.title }}</Heading></template>
          {{ args.default }}
        </Component>
        <div class="min-h-screen" />
      `,
    }
  },
}

export const ModalOverflow: Story = {
  argTypes: {
    default: {
      control: false,
    },
  },
  render: (args) => {
    return {
      components: { Component, Button, Heading },
      setup() {
        const modalRef = ref<typeof Component | null>(null)
        const onClick = () => modalRef.value?.open()
        return { args, modalRef, onClick }
      },
      template: `
        <Button @click="onClick">Open modal</Button>
        <Component ref="modalRef">
          <template #title><Heading type="h4">{{ args.title }}</Heading></template>
          test
          <div class="min-h-screen" />
        </Component>
        <div class="min-h-screen" />
      `,
    }
  },
}

export const Actions: Story = {
  args: {
    default: "Modal",
  },
  render: (args) => {
    return {
      components: { Component, Button, Heading },
      setup() {
        const modalRef = ref<typeof Component | null>(null)
        const onClick = () => modalRef.value?.open()
        return { args, modalRef, onClick }
      },
      template: `
        <Button @click="onClick">Open modal</Button>
        <Component ref="modalRef">
          <template #title><Heading type="h4">{{ args.title }}</Heading></template>
          {{ args.default }}
          <template #actions><Button>Action</Button></template>
        </Component>
      `,
    }
  },
}
