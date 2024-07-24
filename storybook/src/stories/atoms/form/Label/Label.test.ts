import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Label.vue"

describe("label", () => {
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

  it("can have a for attribute", () => {
    const wrapper = mount(Component, {
      props: {
        for: "bogus-for",
      },
    })

    expect(Object.keys(wrapper.attributes())).toContain("for")
    expect(wrapper.attributes().for).toBe("bogus-for")
  })

  it("can be required", () => {
    const wrapper = mount(Component, {
      props: {
        required: true,
      },
    })

    expect(wrapper.find('[data-test-id="label-required"]')).toBeTruthy()
    expect(wrapper.get('[data-test-id="label-required"]').classes()).toContain(
      "text-danger-500",
    )
  })
})
