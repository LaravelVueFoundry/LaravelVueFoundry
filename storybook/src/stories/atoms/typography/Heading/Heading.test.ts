import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Heading.vue"

describe("heading", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      props: {
        type: "h1",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.text()).toContain("test")
  })

  it("can have custom HTML classes", () => {
    const wrapper = mount(Component, {
      props: {
        type: "h1",
        class: "bogus-class",
      },
    })

    expect(wrapper.classes()).toContain("bogus-class")
  })
})
