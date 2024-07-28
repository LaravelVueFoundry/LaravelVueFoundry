import { flushPromises, mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import { defineComponent } from "vue"
import Component from "./ToastContainer.vue"
import useToast from "./composables/useToast"

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

describe("toastContainer", () => {
  it("renders correctly", async () => {
    const wrapper = mount(Component, {
      props: {},
      ...global,
    })

    expect(wrapper.html()).toContain("teleport-stub")
  })

  it("can have custom HTML classes", async () => {
    const wrapper = mount(Component, {
      props: {
        class: "bogus-class",
      },
      ...global,
    })

    expect(
      wrapper.get('[data-test-id="toast-container-wrapper"]').classes(),
    ).toContain("bogus-class")
  })

  it("can be empty", async () => {
    const wrapper = mount(Component)

    expect(wrapper.html()).toBeTruthy()
  })

  it('can render at "top-start"', async () => {
    const wrapper = mount(Component, {
      props: {
        position: "top-start",
      },
      ...global,
    })

    const component = wrapper.get('[data-test-id="toast-container-wrapper"]')

    expect(component.classes()).toContain("top-0")
    expect(component.classes()).toContain("start-0")
  })

  it('can render at "top"', async () => {
    const wrapper = mount(Component, {
      props: {
        position: "top",
      },
      ...global,
    })

    const component = wrapper.get('[data-test-id="toast-container-wrapper"]')

    expect(component.classes()).toContain("top-0")
    expect(component.classes()).not.toContain("start-0")
    expect(component.classes()).not.toContain("end-0")
  })

  it('can render at "top-end"', async () => {
    const wrapper = mount(Component, {
      props: {
        position: "top-end",
      },
      ...global,
    })

    const component = wrapper.get('[data-test-id="toast-container-wrapper"]')

    expect(component.classes()).toContain("top-0")
    expect(component.classes()).toContain("end-0")
  })

  it('can render at "bottom-start"', async () => {
    const wrapper = mount(Component, {
      props: {
        position: "bottom-start",
      },
      ...global,
    })

    const component = wrapper.get('[data-test-id="toast-container-wrapper"]')

    expect(component.classes()).toContain("bottom-0")
    expect(component.classes()).toContain("start-0")
  })

  it('can render at "bottom-end"', async () => {
    const wrapper = mount(Component, {
      props: {
        position: "bottom-end",
      },
      ...global,
    })

    const component = wrapper.get('[data-test-id="toast-container-wrapper"]')

    expect(component.classes()).toContain("bottom-0")
    expect(component.classes()).toContain("end-0")
  })

  it("can close a toast", async () => {
    const wrapper = mount(Component, {
      props: {},
      ...global,
    })

    const toastStore = useToast()

    expect(wrapper.findAll('[data-test-id="toast"]').length).toBe(0)

    toastStore.info("Toast content")
    toastStore.info("Toast content")
    await flushPromises()

    expect(wrapper.findAll('[data-test-id="toast"]').length).toBe(2)

    wrapper.findAll('[data-test-id="toast-close"]')[0].trigger("click")
    await flushPromises()

    expect(wrapper.findAll('[data-test-id="toast"]').length).toBe(1)

    wrapper.findAll('[data-test-id="toast-close"]')[0].trigger("click")
    await flushPromises()

    expect(wrapper.findAll('[data-test-id="toast"]').length).toBe(0)
  })

  it("can close all toasts", async () => {
    const wrapper = mount(Component, {
      props: {},
      ...global,
    })

    const toastStore = useToast()

    expect(wrapper.findAll('[data-test-id="toast"]').length).toBe(0)

    toastStore.info("Toast content")
    toastStore.info("Toast content")
    toastStore.info("Toast content")
    toastStore.info("Toast content")
    await flushPromises()

    expect(wrapper.findAll('[data-test-id="toast"]').length).toBe(4)

    wrapper.get('[data-test-id="toasts-close-all"]').trigger("click")
    await flushPromises()

    expect(wrapper.findAll('[data-test-id="toast"]').length).toBe(0)
  })
})
