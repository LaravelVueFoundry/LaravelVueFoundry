import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Button.vue"

describe("heading", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      slots: {
        default: "test",
      },
    })

    expect(wrapper.text()).toContain("test")
    expect(wrapper.element.tagName).toBe("BUTTON")
    expect(wrapper.classes()).toContain("py-3")
    expect(wrapper.classes()).toContain("bg-gray-700")
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

  it("can be a link", () => {
    const wrapper = mount(Component, {
      props: {
        to: "/",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.attributes().href).toBe("/")
    expect(wrapper.element.tagName).toBe("A")
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

    expect(wrapper.classes()).toContain("py-2")
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

    expect(wrapper.classes()).toContain("py-4")
  })

  it("can be a primary variant", () => {
    const wrapper = mount(Component, {
      props: {
        variant: "primary",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("bg-primary-600")
  })

  it("can be a success variant", () => {
    const wrapper = mount(Component, {
      props: {
        variant: "success",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("bg-success-500")
  })

  it("can be a warning variant", () => {
    const wrapper = mount(Component, {
      props: {
        variant: "warning",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("bg-warning-400")
  })

  it("can be a danger variant", () => {
    const wrapper = mount(Component, {
      props: {
        variant: "danger",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("bg-danger-600")
  })

  it("can be a ghost variant", () => {
    const wrapper = mount(Component, {
      props: {
        variant: "ghost",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("bg-transparent")
  })

  it("can have a click event", () => {
    const wrapper = mount(Component, {
      props: {
        onClick: () => {},
      },
      slots: {
        default: "test",
      },
    })

    wrapper.trigger("click")
    expect(wrapper.emitted()).toHaveProperty("click")
  })

  it("can have a loading state", () => {
    const wrapper = mount(Component, {
      props: {
        loading: true,
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.find('[data-test-id="button-icon"]').exists()).toBe(false)
    expect(wrapper.find('[data-test-id="button-loading-icon"]').exists()).toBe(
      true,
    )
  })

  it("can have an icon", () => {
    const wrapper = mount(Component, {
      props: {
        icon: "mdi:account",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.find('[data-test-id="button-icon"]').exists()).toBe(true)
    expect(wrapper.find('[data-test-id="button-loading-icon"]').exists()).toBe(
      false,
    )
  })
})
