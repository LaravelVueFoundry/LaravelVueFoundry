import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import Component from './Button.vue'

type Props = ComponentProps<typeof Component> & { default: string }

const meta: Meta<Props> = {
  title: 'Atoms/Form/Button',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: [undefined, 'button', 'submit'],
    },
    variant: {
      options: [undefined, 'primary', 'warning', 'danger', 'ghost'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'square'],
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
  args: {
    default: 'Button',
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
    default: 'Button',
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
    default: 'Button',
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
    default: 'Button',
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
    default: 'Button',
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
    default: 'Button',
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
    default: 'Button',
    disabled: false,
    loading: false,
    onClick: () => {},
    size: 'sm',
    type: undefined,
    variant: undefined,
  },
}

export const Square: Story = {
  args: {
    disabled: false,
    loading: false,
    onClick: () => {},
    size: 'square',
    type: undefined,
    variant: undefined,
  },
  render: (args) => {
    return {
      components: { Component },
      setup() { return { args } },
      template: `
        <Component v-bind="args">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/></svg>
        </Component>
      `,
    }
  },
}

export const Disabled: Story = {
  args: {
    default: 'Button',
    disabled: true,
    loading: false,
    onClick: () => {},
    type: undefined,
    variant: undefined,
  },
}

export const ClickEvent: Story = {
  args: {
    default: 'Button',
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
    default: 'Button',
    disabled: false,
    loading: false,
    onClick: e => e.preventDefault(),
    to: '/test',
    type: undefined,
    variant: undefined,
  },
}
