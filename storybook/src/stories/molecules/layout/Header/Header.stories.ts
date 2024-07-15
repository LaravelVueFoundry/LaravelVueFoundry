import type { Meta, StoryObj } from '@storybook/vue3'
import type { ComponentProps } from 'vue-component-type-helpers'
import Component from './Header.vue'

type Props = ComponentProps<typeof Component>

document.body.style.padding = '0'

const meta: Meta<Props> = {
  title: 'Molecules/Layout/Header',
  component: Component,
  tags: ['autodocs'],
  args: {
    title: 'Header title',
    links: [
      {
        title: 'Link 1',
        href: '/',
      },
      {
        title: 'Link 2',
        href: '/',
      },
    ],
  },
}

export default meta
type Story = StoryObj<Props>

export const Default: Story = {}
export const ScrollingPage: Story = {
  render: (args) => {
    return {
      components: { Component },
      setup() { return { args } },
      template: `
        <Component v-bind="args" />
        <div class="min-h-screen" />
        <div class="min-h-screen" />
      `,
    }
  },
}
