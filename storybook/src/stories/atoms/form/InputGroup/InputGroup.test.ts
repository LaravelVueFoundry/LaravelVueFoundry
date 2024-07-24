import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./InputGroup.vue"

describe("inputGroup", () => {
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
})
