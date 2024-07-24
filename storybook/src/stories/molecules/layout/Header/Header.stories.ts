import Card from "@/stories/atoms/container/Card/Card.vue"
import Container from "@/stories/atoms/container/Container/Container.vue"
import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Header.vue"

type Props = ComponentProps<typeof Component>

const meta: Meta<Props> = {
  title: "Molecules/Layout/Header",
  component: Component,
  tags: ["autodocs"],
  args: {
    siteName: "Site name",
    linksPrimary: [
      {
        icon: "mdi:calendar",
        title: "Primary link 1",
        href: "/",
      },
      {
        title: "Primary link 2",
        href: "/",
      },
    ],
    linksSecondary: [
      {
        title: "Secondary link 1",
        href: "/",
      },
      {
        icon: "mdi:account",
        title: "Secondary link 2",
        href: "/",
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
      setup() {
        return { args }
      },
      template: `<div class="-m-4 h-screen"><Component v-bind="args" /></div>`,
    }
  },
}
export const ScrollingPage: Story = {
  render: (args) => {
    return {
      components: { Component, Container, Card },
      setup() {
        return { args }
      },
      template: `
      <div class="-m-4">
        <Component v-bind="args" />
        <Container>
          <Card>
            <template #header>Card header</template>
            Card content
            <template #footer>Card footer</template>
          </Card>
        </Container>
        <div class="min-h-screen" />
        <div class="min-h-screen" />
      </div>
      `,
    }
  },
}
