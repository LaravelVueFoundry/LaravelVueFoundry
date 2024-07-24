import { flushPromises, mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Image.vue"

describe("image", () => {
  it("renders correctly", async () => {
    const wrapper = mount(Component, {
      props: {
        src: "",
        alt: "",
      },
    })

    expect(wrapper.element.tagName).toBe("IMG")
    expect(wrapper.element.src).toBe(
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    )
  })

  it("can have custom HTML classes", async () => {
    const wrapper = mount(Component, {
      props: {
        class: "bogus-class",
        src: "",
        alt: "",
      },
    })

    expect(wrapper.classes()).toContain("bogus-class")
  })

  it("can have a width and height", async () => {
    const wrapper = mount(Component, {
      props: {
        src: "",
        alt: "",
        height: 16,
        width: 32,
      },
    })

    expect(wrapper.attributes().height).toBe("16px")
    expect(wrapper.attributes().width).toBe("32px")
  })

  it("can change the src later", async () => {
    const wrapper = mount(Component, {
      props: {
        src: "",
        alt: "",
      },
    })

    await flushPromises()
    expect(wrapper.element.src).toBe(
      `${window.location.origin}${window.location.pathname}`,
    )

    wrapper.setProps({ src: "/img.png" })

    await flushPromises()
    expect(wrapper.element.src).toBe(
      `${window.location.origin}${window.location.pathname}img.png`,
    )
  })

  it("has a fallback image", async () => {
    const wrapper = mount(Component, {
      props: {
        src: "/bogus",
        alt: "",
      },
    })

    wrapper.get('[data-test-id="image"]').trigger("error")

    await flushPromises()
    expect(wrapper.element.tagName).toBe("DIV")
  })
})
