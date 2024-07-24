import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Well.vue"

describe("well", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      slots: {
        default: "test",
      },
    })

    expect(wrapper.text()).toContain("test")
  })

  it("can have custom HTML classes", () => {
    const wrapper = mount(Component, {
      props: {
        class: "bogus-class",
      },
    })

    expect(wrapper.classes()).toContain("bogus-class")
  })

  it("can be empty", () => {
    const wrapper = mount(Component)

    expect(wrapper.html()).toBeTruthy()
  })

  it("can be a medium size", () => {
    const wrapper = mount(Component, {
      props: {
        size: "md",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("p-6")
  })

  it("can be small", () => {
    const wrapper = mount(Component, {
      props: {
        size: "sm",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("px-3")
  })

  it("can be large", () => {
    const wrapper = mount(Component, {
      props: {
        size: "lg",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("p-8")
  })
})
