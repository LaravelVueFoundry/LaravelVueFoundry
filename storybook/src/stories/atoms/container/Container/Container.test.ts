import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Container.vue"

describe("container", () => {
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

  it("can be a regular size", () => {
    const wrapper = mount(Component, {
      props: {
        type: "regular",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("max-w-6xl")
  })

  it("can be wide", () => {
    const wrapper = mount(Component, {
      props: {
        type: "wide",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("max-w-7xl")
  })

  it("can be narrow", () => {
    const wrapper = mount(Component, {
      props: {
        type: "narrow",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("max-w-2xl")
  })

  it("can be full-sized", () => {
    const wrapper = mount(Component, {
      props: {
        type: "full",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes().join(" ")).not.toContain("max-w-")
  })
})
