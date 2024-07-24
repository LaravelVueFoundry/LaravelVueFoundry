import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Checkbox.vue"

describe("checkbox", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      props: {
        name: "checkbox",
        label: "Checkbox",
      },
    })

    expect(wrapper.findAll('[data-test-id="checkbox-input"]').length).toBe(1)
  })

  it("can have custom HTML classes", () => {
    const wrapper = mount(Component, {
      props: {
        name: "checkbox",
        label: "Checkbox",
        class: "bogus-class",
      },
    })

    expect(wrapper.get('[data-test-id="checkbox-input"]').classes()).toContain(
      "bogus-class",
    )
  })

  it("changes v-model on change", async () => {
    const wrapper = mount(Component, {
      props: {
        name: "checkbox",
        label: "Checkbox",
        modelValue: false,
        "onUpdate:modelValue": (e) => wrapper.setProps({ modelValue: e }),
      },
    })

    expect(wrapper.props("modelValue")).toBe(false)
    expect(
      Object.keys(wrapper.get('[data-test-id="checkbox-input"]').attributes()),
    ).not.toContain("checked")

    wrapper.get('[data-test-id="checkbox-input"]').trigger("change")
    expect(wrapper.emitted()).toHaveProperty("change")

    await wrapper.setValue(true)
    await wrapper.get('[data-test-id="checkbox-input"]').setValue(true)
    expect(wrapper.props("modelValue")).toBe(true)
    expect(
      Object.keys(wrapper.get('[data-test-id="checkbox-input"]').attributes()),
    ).toContain("checked")
  })
})
