import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Card.vue"

describe("card", () => {
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
        wrapperClass: "bogus-wrapper-class",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.get('[data-test-id="body"]').classes()).toContain(
      "bogus-class",
    )
    expect(wrapper.get('[data-test-id="wrapper"]').classes()).toContain(
      "bogus-wrapper-class",
    )
  })

  it("can be empty", () => {
    const wrapper = mount(Component)

    expect(wrapper.html()).toBeTruthy()
  })

  it("can align at the start", () => {
    const wrapper = mount(Component, {
      props: {
        align: "start",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("text-start")
  })

  it("can align in the middle", () => {
    const wrapper = mount(Component, {
      props: {
        align: "middle",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("text-center")
  })

  it("can align at the end", () => {
    const wrapper = mount(Component, {
      props: {
        align: "end",
      },
      slots: {
        default: "test",
      },
    })

    expect(wrapper.classes()).toContain("text-end")
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

    expect(wrapper.get('[data-test-id="body"]').classes()).toContain("px-4")
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

    expect(wrapper.get('[data-test-id="body"]').classes()).toContain("px-7")
  })

  it("can have a header", () => {
    const wrapper = mount(Component, {
      slots: {
        default: "test",
        header: "header-test",
      },
    })

    expect(wrapper.get('[data-test-id="header"]').text()).toBe("header-test")
  })

  it("can have a large header", () => {
    const wrapper = mount(Component, {
      props: {
        size: "lg",
      },
      slots: {
        default: "test",
        header: "header-test",
      },
    })

    expect(wrapper.get('[data-test-id="header"]').classes()).toContain("py-5")
    expect(wrapper.get('[data-test-id="body"]').classes()).toContain("px-7")
  })

  it("can have a small header", () => {
    const wrapper = mount(Component, {
      props: {
        size: "sm",
      },
      slots: {
        default: "test",
        header: "header-test",
      },
    })

    expect(wrapper.get('[data-test-id="header"]').classes()).toContain("py-3")
    expect(wrapper.get('[data-test-id="body"]').classes()).toContain("px-4")
  })

  it("can have a footer", () => {
    const wrapper = mount(Component, {
      slots: {
        default: "test",
        footer: "footer-test",
      },
    })

    expect(wrapper.get('[data-test-id="footer"]').text()).toBe("footer-test")
  })
})
