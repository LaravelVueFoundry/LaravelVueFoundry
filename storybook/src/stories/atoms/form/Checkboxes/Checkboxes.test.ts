import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Checkboxes.vue"

const defaultProps = {
  name: "checkboxes",
  options: [
    { label: "Option 1" },
    { label: "Option 2" },
    { label: "Option 3" },
  ],
}

describe("checkboxes", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      props: {
        ...defaultProps,
      },
    })

    expect(wrapper.findAll('[data-test-id="checkbox-input"]').length).toBe(3)
  })

  it("can have custom HTML classes", () => {
    const wrapper = mount(Component, {
      props: {
        ...defaultProps,
        class: "bogus-class",
        wrapperClass: "bogus-wrapper-class",
      },
    })

    expect(
      wrapper.get('[data-test-id="checkbox-wrapper"]').classes(),
    ).toContain("bogus-wrapper-class")
    expect(wrapper.get('[data-test-id="checkbox-input"]').classes()).toContain(
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
      Object.keys(wrapper.get('[data-test-id="checkbox-input"]').attributes()),
    ).toContain("required")
  })

  it("can have a default option", () => {
    const wrapper = mount(Component, {
      props: {
        ...defaultProps,
        modelValue: [1],
      },
    })

    expect(wrapper.props("modelValue")).toStrictEqual([1])
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="checkbox-input"]')[0].attributes(),
      ),
    ).not.toContain("checked")
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="checkbox-input"]')[1].attributes(),
      ),
    ).toContain("checked")
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="checkbox-input"]')[2].attributes(),
      ),
    ).not.toContain("checked")
  })

  it("changes v-model on input", async () => {
    const wrapper = mount(Component, {
      props: {
        ...defaultProps,
        modelValue: [0, 1],
        "onUpdate:modelValue": (e) => wrapper.setProps({ modelValue: e }),
      },
    })

    expect(wrapper.props("modelValue")).toStrictEqual([0, 1])
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="checkbox-input"]')[0].attributes(),
      ),
    ).toContain("checked")
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="checkbox-input"]')[1].attributes(),
      ),
    ).toContain("checked")
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="checkbox-input"]')[2].attributes(),
      ),
    ).not.toContain("checked")

    wrapper.findAll('[data-test-id="checkbox-input"]')[1].trigger("change")
    expect(wrapper.emitted()).toHaveProperty("change")

    await wrapper.setValue([0])
    await wrapper.findAll('[data-test-id="checkbox-input"]')[1].setValue(false)
    expect(wrapper.props("modelValue")).toStrictEqual([0])

    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="checkbox-input"]')[0].attributes(),
      ),
    ).toContain("checked")
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="checkbox-input"]')[1].attributes(),
      ),
    ).not.toContain("checked")
    expect(
      Object.keys(
        wrapper.findAll('[data-test-id="checkbox-input"]')[2].attributes(),
      ),
    ).not.toContain("checked")
  })
})
