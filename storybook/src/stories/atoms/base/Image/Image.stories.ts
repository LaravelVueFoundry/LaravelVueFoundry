import type { Meta, StoryObj } from "@storybook/vue3"
import type { ComponentProps } from "vue-component-type-helpers"
import Component from "./Image.vue"

import MockImgLandscape from "./__mocks__/image-dimensions-landscape.png"
import MockImgPortrait from "./__mocks__/image-dimensions-portrait.png"

type Props = ComponentProps<typeof Component>

const meta: Meta<Props> = {
  title: "Atoms/Base/Image",
  component: Component,
  tags: ["autodocs"],
  args: {
    alt: "Alternate text",
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
    src: MockImgLandscape,
    height: 1080,
    width: 1920,
  },
}

export const Portrait: Story = {
  args: {
    src: MockImgPortrait,
    height: 1920,
    width: 1080,
  },
}

export const Square: Story = {
  args: {
    src: MockImgLandscape,
    height: 256,
    width: 256,
  },
}

export const Broken: Story = {
  args: {
    src: "/some/broken/url",
    height: 1080,
    width: 1920,
  },
}
