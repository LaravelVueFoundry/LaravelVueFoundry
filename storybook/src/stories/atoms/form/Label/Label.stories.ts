import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import Label from './Label.vue'

type Props = ComponentProps<typeof Label> & { default: string }

const meta: Meta<Props> = {
  title: 'Atoms/Form/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    default: 'Label',
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
    required: false,
  },
}

export const Required: Story = {
  args: {
    required: true,
  },
}
