import { flushPromises, mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import { defineComponent } from "vue"
import Component from "./Header.vue"

const TransitionStub = defineComponent({
  emits: ["afterEnter", "afterLeave"],
  setup(_, { emit }) {
    return {
      async emitAfterEnter() {
        await flushPromises()
        emit("afterEnter")
      },
      async emitAfterLeave() {
        await flushPromises()
        emit("afterLeave")
      },
    }
  },
  template: "<div><slot /></div>",
})

const global = {
  global: {
    stubs: {
      teleport: true,
      transition: TransitionStub,
    },
  },
}

describe("header", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      ...global,
    })

    expect(wrapper.element.tagName).toBe("HEADER")
  })

  it("can have custom HTML classes", () => {
    const wrapper = mount(Component, {
      props: {
        class: "bogus-class",
      },
      ...global,
    })

    expect(wrapper.classes()).toContain("bogus-class")
  })

  it("can be empty", () => {
    const wrapper = mount(Component)

    expect(wrapper.html()).toBeTruthy()
  })

  it("has a desktop menu variant", () => {
    globalThis.innerWidth = 1000
    const wrapper = mount(Component, {
      ...global,
    })

    expect(wrapper.find('[data-test-id="menu-desktop"]').exists()).toBe(true)
    expect(wrapper.find('[data-test-id="menu-mobile"]').exists()).toBe(false)
  })

  it("has a mobile menu variant", () => {
    globalThis.innerWidth = 500
    const wrapper = mount(Component, {
      ...global,
    })

    expect(wrapper.find('[data-test-id="menu-desktop"]').exists()).toBe(false)
    expect(wrapper.find('[data-test-id="menu-mobile"]').exists()).toBe(true)
  })

  it("can be opened and closed", async () => {
    globalThis.innerWidth = 500
    const wrapper = mount(Component, {
      ...global,
    })

    expect(wrapper.find('[data-test-id="header-menu-wrapper"]').exists()).toBe(
      false,
    )
    expect(wrapper.find('[data-test-id="header-menu-body"]').exists()).toBe(
      false,
    )

    wrapper.vm.openMobileMenu()
    wrapper.find('[data-test-id="header-menu-toggle"]').trigger("click")
    await flushPromises()
    expect(wrapper.find('[data-test-id="header-menu-wrapper"]').exists()).toBe(
      true,
    )
    expect(wrapper.find('[data-test-id="header-menu-body"]').exists()).toBe(
      false,
    )

    for await (const c of wrapper.findAllComponents(TransitionStub))
      await c.vm.emitAfterEnter()

    expect(wrapper.find('[data-test-id="header-menu-wrapper"]').exists()).toBe(
      true,
    )
    expect(wrapper.find('[data-test-id="header-menu-body"]').exists()).toBe(
      true,
    )

    wrapper.vm.closeMobileMenu()
    wrapper.find('[data-test-id="header-menu-toggle"]').trigger("click")
    await flushPromises()
    expect(wrapper.find('[data-test-id="header-menu-wrapper"]').exists()).toBe(
      true,
    )
    expect(wrapper.find('[data-test-id="header-menu-body"]').exists()).toBe(
      false,
    )

    for await (const c of wrapper.findAllComponents(TransitionStub))
      await c.vm.emitAfterLeave()

    wrapper
      .findAllComponents(TransitionStub)
      .forEach(async (c) => await c.vm.emitAfterLeave())
    expect(wrapper.find('[data-test-id="header-menu-wrapper"]').exists()).toBe(
      false,
    )
    expect(wrapper.find('[data-test-id="header-menu-body"]').exists()).toBe(
      false,
    )
  })
})
