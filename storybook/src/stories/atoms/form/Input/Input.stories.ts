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
    autocomplete: undefined,
    autofocus: false,
    disabled: false,
    formnovalidate: false,
    maxlength: undefined,
    name: 'default',
    placeholder: 'Placeholder...',
    required: false,
    type: 'text',
  },
}

export const Disabled: Story = {
  args: {
    autocomplete: undefined,
    autofocus: false,
    disabled: true,
    formnovalidate: false,
    maxlength: undefined,
    name: 'disabled',
    placeholder: 'Placeholder...',
    required: false,
    type: 'text',
  },
}

export const Autofocus: Story = {
  args: {
    autocomplete: undefined,
    autofocus: true,
    disabled: false,
    formnovalidate: false,
    maxlength: undefined,
    name: 'autofocus',
    placeholder: 'Placeholder...',
    required: false,
    type: 'text',
  },
}

export const Textarea: Story = {
  args: {
    autocomplete: undefined,
    autofocus: false,
    disabled: false,
    formnovalidate: false,
    maxlength: undefined,
    name: 'textarea',
    placeholder: 'Placeholder...',
    required: false,
    type: 'textarea',
  },
}

export const Prefilled: Story = {
  args: {
    autocomplete: undefined,
    autofocus: false,
    disabled: false,
    formnovalidate: false,
    maxlength: undefined,
    name: 'textarea',
    placeholder: 'Placeholder...',
    required: false,
    type: 'textarea',
    modelValue: 'Pre-filled value',
  },
}
