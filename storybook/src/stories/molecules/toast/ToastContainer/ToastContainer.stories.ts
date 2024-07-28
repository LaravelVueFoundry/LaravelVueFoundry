import Button from "@/stories/atoms/form/Button/Button.vue"
import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./ToastContainer.vue"
import useToast from "./composables/useToast"

Component.inheritAttrs = false

type Props = ComponentProps<typeof Component> & {
  messageTitle: string
  messageContent: string
}

const meta: Meta<Props> = {
  title: "Molecules/Toast/ToastContainer",
  component: Component,
  tags: ["autodocs"],
  args: {
    noCloseAllButton: false,
    position: "bottom",
    messageTitle: "Message title",
    messageContent: "Message content",
  },
  argTypes: {
    position: {
      control: "radio",
      options: [
        "top-start",
        "top",
        "top-end",
        "bottom-start",
        "bottom",
        "bottom-end",
      ],
    },
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {
  render: (args) => {
    return {
      components: { Component, Button },
      setup() {
        const toastStore = useToast()
        const onClick = () =>
          toastStore.info(args.messageContent, {
            title: args.messageTitle,
          })

        return { args, onClick }
      },
      template: `<Button variant="primary" @click="onClick">Show toast</Button><Component v-bind="args" />`,
    }
  },
}

export const Success: Story = {
  render: (args) => {
    return {
      components: { Component, Button },
      setup() {
        const toastStore = useToast()
        const onClick = () =>
          toastStore.success(args.messageContent, {
            title: args.messageTitle,
          })

        return { args, onClick }
      },
      template: `<Button variant="success" @click="onClick">Show toast</Button><Component v-bind="args" />`,
    }
  },
}

export const Warning: Story = {
  render: (args) => {
    return {
      components: { Component, Button },
      setup() {
        const toastStore = useToast()
        const onClick = () =>
          toastStore.warning(args.messageContent, {
            title: args.messageTitle,
          })

        return { args, onClick }
      },
      template: `<Button variant="warning" @click="onClick">Show toast</Button><Component v-bind="args" />`,
    }
  },
}

export const Danger: Story = {
  render: (args) => {
    return {
      components: { Component, Button },
      setup() {
        const toastStore = useToast()
        const onClick = () =>
          toastStore.error(args.messageContent, {
            title: args.messageTitle,
          })

        return { args, onClick }
      },
      template: `<Button variant="danger" @click="onClick">Show toast</Button><Component v-bind="args" />`,
    }
  },
}
