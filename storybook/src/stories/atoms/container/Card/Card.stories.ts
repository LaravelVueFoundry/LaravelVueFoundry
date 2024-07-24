import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Card.vue"

type Props = ComponentProps<typeof Component> & {
  default: string
  footer?: string
  header?: string
}

const meta: Meta<Props> = {
  title: "Atoms/Container/Card",
  component: Component,
  tags: ["autodocs"],
  args: {
    align: "start",
    default: "Lorem ipsum dolor sit amet",
    size: "md",
  },
  argTypes: {
    align: {
      control: "inline-radio",
      options: ["start", "middle", "end"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
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
  args: {},
}

export const Header: Story = {
  args: {
    header: "Header",
  },
  parameters: {
    slots: {
      header: {},
    },
  },
}

export const Footer: Story = {
  args: {
    footer: "Footer",
  },
  parameters: {
    slots: {
      footer: {},
    },
  },
}

export const Small: Story = {
  args: {
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
  },
}

export const AlignStart: Story = {
  args: {
    align: "start",
    footer: "Footer",
    header: "Header",
  },
  parameters: {
    slots: {
      footer: {},
      header: {},
    },
  },
}

export const AlignMiddle: Story = {
  args: {
    align: "middle",
    footer: "Footer",
    header: "Header",
  },
  parameters: {
    slots: {
      footer: {},
      header: {},
    },
  },
}
export const AlignEnd: Story = {
  args: {
    align: "end",
    footer: "Footer",
    header: "Header",
  },
  parameters: {
    slots: {
      footer: {},
      header: {},
    },
  },
}
