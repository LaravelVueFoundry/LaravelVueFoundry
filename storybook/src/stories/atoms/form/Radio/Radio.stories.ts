import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import Radio from './Radio.vue'

type Props = ComponentProps<typeof Radio>

const meta: Meta<Props> = {
  title: 'Atoms/Form/Radio',
  component: Radio,
  tags: ['autodocs'],
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
    defaultOption: 0,
    name: 'default',
    options: getOptions(3),
    required: false,
  },
}
