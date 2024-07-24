import { flushPromises, mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import { defineComponent } from "vue"
import Component from "./Modal.vue"

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

describe("modal", () => {
  it("renders correctly", async () => {
    const wrapper = mount(Component, {
      slots: {
        default: "test",
      },
      ...global,
    })

    wrapper.vm.open()
    await wrapper.findComponent(TransitionStub).vm.emitAfterEnter()
    expect(wrapper.get('[data-test-id="modal-body"]').html()).toContain("test")
  })

  it("can have custom HTML classes", async () => {
    const wrapper = mount(Component, {
      props: {
        class: "bogus-class",
      },
      ...global,
    })

    wrapper.vm.open()
    await wrapper.findComponent(TransitionStub).vm.emitAfterEnter()
    expect(wrapper.get('[data-test-id="modal-body"]').classes()).toContain(
      "bogus-class",
    )
  })

  it("can be empty", () => {
    const wrapper = mount(Component)

    expect(wrapper.html()).toBeTruthy()
  })

  it("can be opened and closed", async () => {
    const wrapper = mount(Component, {
      ...global,
    })

    expect(wrapper.find('[data-test-id="modal-wrapper"]').exists()).toBe(false)
    expect(wrapper.find('[data-test-id="modal-body"]').exists()).toBe(false)

    wrapper.vm.open()
    await flushPromises()
    expect(wrapper.find('[data-test-id="modal-wrapper"]').exists()).toBe(true)
    expect(wrapper.find('[data-test-id="modal-body"]').exists()).toBe(false)

    await wrapper.findComponent(TransitionStub).vm.emitAfterEnter()
    expect(wrapper.find('[data-test-id="modal-wrapper"]').exists()).toBe(true)
    expect(wrapper.find('[data-test-id="modal-body"]').exists()).toBe(true)

    wrapper.vm.close()
    await flushPromises()
    expect(wrapper.find('[data-test-id="modal-wrapper"]').exists()).toBe(true)
    expect(wrapper.find('[data-test-id="modal-body"]').exists()).toBe(false)

    await wrapper
      .get('[data-test-id="modal-transition-inner"]')
      .findComponent(TransitionStub)
      .vm.emitAfterLeave()
    await wrapper.findComponent(TransitionStub).vm.emitAfterLeave()
    expect(wrapper.find('[data-test-id="modal-wrapper"]').exists()).toBe(false)
    expect(wrapper.find('[data-test-id="modal-body"]').exists()).toBe(false)
  })

  it("can be closed with the escape key", async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      ...global,
    })

    wrapper.vm.open()
    await wrapper.findComponent(TransitionStub).vm.emitAfterEnter()
    expect(wrapper.find('[data-test-id="modal-body"]').exists()).toBe(true)

    await wrapper.trigger("keydown", { key: "Escape" })

    await wrapper.findComponent(TransitionStub).vm.emitAfterLeave()
    expect(wrapper.find('[data-test-id="modal-body"]').exists()).toBe(false)
  })
})
