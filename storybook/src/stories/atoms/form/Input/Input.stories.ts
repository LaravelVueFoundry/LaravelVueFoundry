import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import Input from './Input.vue'

type Props = ComponentProps<typeof Input>

const meta: Meta<Props> = {
  title: 'Atoms/Form/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['email', 'number', 'password', 'search', 'tel', 'text', 'url', 'textarea'],
    },
  },
  args: {},
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {
  args: {
    disabled: false,
    placeholder: 'Placeholder...',
    required: false,
    type: 'text',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Placeholder...',
    required: false,
    type: 'text',
  },
}
