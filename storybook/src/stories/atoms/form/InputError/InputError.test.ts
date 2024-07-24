import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./InputError.vue"

describe("inputError", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      attrs: {
        message: "test",
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
})
