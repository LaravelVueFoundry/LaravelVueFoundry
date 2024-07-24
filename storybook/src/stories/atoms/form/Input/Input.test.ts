import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Input.vue"

describe("input", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      props: {
        name: "input",
      },
    })

    expect(wrapper.element.tagName).toBe("INPUT")
    expect(wrapper.attributes().type).toBe("text")
  })

  it("can have custom HTML classes", () => {
    const wrapper = mount(Component, {
      props: {
        name: "input",
        class: "bogus-class",
      },
    })

    expect(wrapper.classes()).toContain("bogus-class")
  })

  it("can be a textarea", () => {
    const wrapper = mount(Component, {
      props: {
        type: "textarea",
        name: "input",
      },
    })

    expect(wrapper.element.tagName).toBe("TEXTAREA")
    expect(wrapper.attributes().type).toBeUndefined()
  })

  it("can have autofocus", () => {
    const wrapper = mount(Component, {
      props: {
        autofocus: true,
        name: "input",
      },
    })

    expect(Object.keys(wrapper.attributes())).toContain("autofocus")
  })

  it("can get focus manually", () => {
    const wrapper = mount(Component, {
      props: {
        name: "input",
      },
    })

    expect(wrapper.element.matches(":focus")).toBe(false)
    wrapper.vm.focus()
  })

  it("changes v-model on input", async () => {
    const wrapper = mount(Component, {
      props: {
        name: "input",
        modelValue: "",
        "onUpdate:modelValue": (e) => wrapper.setProps({ modelValue: e }),
      },
    })

    expect(wrapper.props("modelValue")).toBe("")
    expect(wrapper.attributes().value).toBe("")

    wrapper.trigger("input")
    expect(wrapper.emitted()).toHaveProperty("input")

    await wrapper.setValue("some input")
    expect(wrapper.props("modelValue")).toBe("some input")
    expect(wrapper.attributes().value).toBe("some input")
  })
})
