import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Radio.vue"

const defaultProps = {
  name: "radio",
  options: [
    { label: "Option 1" },
    { label: "Option 2" },
    { label: "Option 3" },
  ],
}

describe("radio", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      props: {
        ...defaultProps,
      },
    })

    expect(wrapper.findAll('[data-test-id="radio-input"]').length).toBe(3)
  })

  it("can have custom HTML classes", () => {
    const wrapper = mount(Component, {
      props: {
        ...defaultProps,
        class: "bogus-class",
        wrapperClass: "bogus-wrapper-class",
      },
    })

    expect(wrapper.get('[data-test-id="radio-wrapper"]').classes()).toContain(
      "bogus-wrapper-class",
    )
    expect(wrapper.get('[data-test-id="radio-input"]').classes()).toContain(
      "bogus-class",
    )
  })

  it("can be required", () => {
    const wrapper = mount(Component, {
      props: {
        ...defaultProps,
        required: true,
      },
    })

    expect(
      Object.keys(wrapper.get('[data-test-id="radio-input"]').attributes()),
    ).toContain("required")
  })

  it("can have a default option", () => {
    const wrapper = mount(Component, {
      props: {
        ...defaultProps,
        modelValue: 1,
      },
    })

    expect(wrapper.props("modelValue")).toBe(1)
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="radio-input"]')[0].attributes(),
      ),
    ).not.toContain("checked")
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="radio-input"]')[1].attributes(),
      ),
    ).toContain("checked")
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="radio-input"]')[2].attributes(),
      ),
    ).not.toContain("checked")
  })

  it("changes v-model on input", async () => {
    const wrapper = mount(Component, {
      props: {
        ...defaultProps,
        modelValue: 0,
        "onUpdate:modelValue": (e) => wrapper.setProps({ modelValue: e }),
      },
    })

    expect(wrapper.props("modelValue")).toBe(0)
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="radio-input"]')[0].attributes(),
      ),
    ).toContain("checked")
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="radio-input"]')[1].attributes(),
      ),
    ).not.toContain("checked")
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="radio-input"]')[2].attributes(),
      ),
    ).not.toContain("checked")

    wrapper.findAll('[data-test-id="radio-input"]')[2].trigger("input")
    expect(wrapper.emitted()).toHaveProperty("input")

    await wrapper.setValue(2)
    expect(wrapper.props("modelValue")).toBe(2)
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="radio-input"]')[0].attributes(),
      ),
    ).not.toContain("checked")
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="radio-input"]')[1].attributes(),
      ),
    ).not.toContain("checked")
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="radio-input"]')[2].attributes(),
      ),
    ).toContain("checked")
  })
})
