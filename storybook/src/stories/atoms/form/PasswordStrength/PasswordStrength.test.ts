import { flushPromises, mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./PasswordStrength.vue"

describe("passwordStrength", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      props: {
        password: "",
      },
    })

    expect(wrapper.text()).toBe("")
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

  it("can have the score change", async () => {
    const wrapper = mount(Component, {
      props: {
        password: "",
      },
    })

    await flushPromises()
    expect((wrapper.vm as unknown as { score: number }).score).toBe(0)

    await wrapper.setProps({ password: "updated" })
    await flushPromises()
    expect((wrapper.vm as unknown as { score: number }).score).toBe(1)
  })

  it("may not be a common password", async () => {
    const wrapper = mount(Component, {
      props: {
        password: "qwertyuiop",
      },
    })

    await flushPromises()
    expect((wrapper.vm as unknown as { score: number }).score).toBe(0)
  })

  it("may not be shorter than 6 characters", async () => {
    const wrapper = mount(Component, {
      props: {
        password: "short",
      },
    })

    await flushPromises()
    expect((wrapper.vm as unknown as { score: number }).score).toBe(0)
  })

  it("can be 6 characters", async () => {
    const wrapper = mount(Component, {
      props: {
        password: "stapler",
      },
    })

    await flushPromises()
    expect((wrapper.vm as unknown as { score: number }).score).toBe(1)
  })

  it("can be 8 characters", async () => {
    const wrapper = mount(Component, {
      props: {
        password: "somepass",
      },
    })

    await flushPromises()
    expect((wrapper.vm as unknown as { score: number }).score).toBe(2)
  })

  it("can be 12 characters", async () => {
    const wrapper = mount(Component, {
      props: {
        password: "fluffybanana",
      },
    })

    await flushPromises()
    expect((wrapper.vm as unknown as { score: number }).score).toBe(3)
  })

  it("should have uppercase characters", async () => {
    const wrapper = mount(Component, {
      props: {
        password: "Mammoth",
      },
    })

    await flushPromises()
    expect((wrapper.vm as unknown as { score: number }).score).toBe(2)
  })

  it("should have numbers", async () => {
    const wrapper = mount(Component, {
      props: {
        password: "parr0t",
      },
    })

    await flushPromises()
    expect((wrapper.vm as unknown as { score: number }).score).toBe(2)
  })

  it("should have special characters", async () => {
    const wrapper = mount(Component, {
      props: {
        password: "k!tten",
      },
    })

    await flushPromises()
    expect((wrapper.vm as unknown as { score: number }).score).toBe(2)
  })

  it("can achieve the highest score", async () => {
    const wrapper = mount(Component, {
      props: {
        password: "ZR6U7Mw@Kz#7",
      },
    })

    await flushPromises()
    expect((wrapper.vm as unknown as { score: number }).score).toBe(6)
  })
})
