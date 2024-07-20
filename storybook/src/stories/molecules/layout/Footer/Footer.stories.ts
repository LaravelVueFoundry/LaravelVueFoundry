import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import Component from './Footer.vue'

type Props = ComponentProps<typeof Component>

const meta: Meta<Props> = {
  title: 'Molecules/Layout/Footer',
  component: Component,
  tags: ['autodocs'],
  args: {
    title: 'Footer title',
    linksPrimary: [
      {
        icon: 'mdi:calendar',
        title: 'Primary link 1',
        href: '/',
      },
      {
        title: 'Primary link 2',
        href: '/',
      },
    ],
    linksSecondary: [
      {
        title: 'Secondary link 1',
        href: '/',
      },
      {
        icon: 'mdi:account',
        title: 'Secondary link 2',
        href: '/',
      },
    ],
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {
  render: (args) => {
    return {
      components: { Component },
      setup() { return { args } },
      template: `<div class="-m-4 h-screen"><Component v-bind="args" /></div>`,
    }
  },
}
