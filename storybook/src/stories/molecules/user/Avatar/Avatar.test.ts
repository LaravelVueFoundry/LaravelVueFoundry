import { flushPromises, mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Avatar.vue"

describe("avatar", () => {
  it("renders correctly", async () => {
    const wrapper = mount(Component, {
      props: {
        name: "Some User",
        src: "",
      },
    })

    await flushPromises()

    expect(wrapper.html()).toContain('alt="Some User"')
  })

  it("can have custom HTML classes", async () => {
    const wrapper = mount(Component, {
      props: {
        class: "bogus-class",
        name: "Some User",
      },
    })

    expect(wrapper.get('[data-test-id="avatar-img"]').classes()).toContain(
      "bogus-class",
    )
  })

  it("has a fallback", async () => {
    const wrapper = mount(Component, {
      props: {
        name: "Some User",
      },
    })

    wrapper.get('[data-test-id="avatar-img"]').trigger("error")
    await flushPromises()

    expect(
      wrapper.get('[data-test-id="avatar-fallback"] text').text(),
    ).toContain("SU")
  })

  it("can have custom HTML classes in the fallback", async () => {
    const wrapper = mount(Component, {
      props: {
        class: "bogus-class",
        name: "Some User",
      },
    })

    wrapper.get('[data-test-id="avatar-img"]').trigger("error")
    await flushPromises()

    expect(wrapper.get('[data-test-id="avatar-fallback"]').classes()).toContain(
      "bogus-class",
    )
  })

  it("Limits the initials", async () => {
    const wrapper = mount(Component, {
      props: {
        name: "Some User With a Really Long Name",
      },
    })

    wrapper.get('[data-test-id="avatar-img"]').trigger("error")
    await flushPromises()

    expect(
      wrapper.get('[data-test-id="avatar-fallback"] text').text(),
    ).toContain("SUW")
  })

  it("skips creating initials with a valid avatar", async () => {
    const wrapper = mount(Component, {
      props: {
        name: "Some User",
      },
    })

    // @ts-expect-error The "initials" props does exist.
    expect(wrapper.vm.initials).toBe("")

    wrapper.get('[data-test-id="avatar-img"]').trigger("error")
    await flushPromises()

    // @ts-expect-error The "initials" props does exist.
    expect(wrapper.vm.initials).toContain("SU")
  })
})
