import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import type { ComponentProps } from 'vue-component-type-helpers'
import Button from './Button.vue'

type Props = ComponentProps<typeof Button> & { default: string }

const meta: Meta<Props> = {
  title: 'Atoms/Form/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: [undefined, 'button', 'submit'],
    },
    variant: {
      options: [undefined, 'primary', 'warning', 'danger', 'ghost'],
    },
    size: {
      options: ['md', 'lg', 'sm'],
    },
  },
  args: {
    default: 'Button',
    loading: false,
    size: 'md',
    onClick: fn(),
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
    disabled: false,
    loading: false,
    onClick: () => {},
    size: 'md',
    type: undefined,
    variant: undefined,
  },
}

export const Primary: Story = {
  args: {
    disabled: false,
    loading: false,
    onClick: () => {},
    size: 'md',
    type: undefined,
    variant: 'primary',
  },
}

export const Warning: Story = {
  args: {
    disabled: false,
    loading: false,
    onClick: () => {},
    size: 'md',
    type: undefined,
    variant: 'warning',
  },
}

export const Danger: Story = {
  args: {
    disabled: false,
    loading: false,
    onClick: () => {},
    size: 'md',
    type: undefined,
    variant: 'danger',
  },
}

export const Ghost: Story = {
  args: {
    disabled: false,
    loading: false,
    onClick: () => {},
    size: 'md',
    type: undefined,
    variant: 'ghost',
  },
}

export const Large: Story = {
  args: {
    disabled: false,
    loading: false,
    onClick: () => {},
    size: 'lg',
    type: undefined,
    variant: undefined,
  },
}

export const Small: Story = {
  args: {
    disabled: false,
    loading: false,
    onClick: () => {},
    size: 'sm',
    type: undefined,
    variant: undefined,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    loading: false,
    onClick: () => {},
    type: undefined,
    variant: undefined,
  },
}

export const ClickEvent: Story = {
  args: {
    disabled: false,
    loading: false,
    // eslint-disable-next-line no-alert
    onClick: e => alert(`Button clicked: ${e}`),
    type: undefined,
    variant: undefined,
  },
}

export const LinkButton: Story = {
  args: {
    disabled: false,
    loading: false,
    onClick: e => e.preventDefault(),
    to: '/test',
    type: undefined,
    variant: undefined,
  },
}
