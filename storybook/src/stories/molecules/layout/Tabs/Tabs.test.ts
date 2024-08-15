import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Tabs.vue"

describe("tabs", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      props: {
        items: [
          {
            title: "Tab 1",
            href: "/",
          },
        ],
      },
    })

    expect(wrapper.text()).toContain("Tab 1")
  })

  it("can have custom HTML classes", () => {
    const wrapper = mount(Component, {
      props: {
        class: "bogus-class",
        wrapperClass: "bogus-wrapper-class",
        items: [
          {
            title: "Tab 1",
            href: "/",
          },
        ],
      },
    })

    expect(wrapper.classes()).toContain("bogus-wrapper-class")
    expect(wrapper.findAll('[data-test-id="tabs-tab"]')[0].classes()).toContain(
      "bogus-class",
    )
  })

  it("can have multiple items", () => {
    const wrapper = mount(Component, {
      props: {
        items: [
          {
            title: "Tab 1",
            href: "/",
          },
          {
            title: "Tab 2",
            href: "/",
          },
          {
            title: "Tab 3",
            href: "/",
          },
        ],
      },
    })

    expect(wrapper.findAll('[data-test-id="tabs-tab"]').length).toBe(3)
  })

  it("can have an icon", () => {
    const wrapper = mount(Component, {
      props: {
        items: [
          {
            icon: "mdi:account",
            title: "Tab 1",
            href: "/",
          },
        ],
      },
    })

    expect(wrapper.findAll('[data-test-id="tabs-tab"] > svg')[0]).toBeTruthy()
  })
})
