import { flushPromises, mount } from "@vue/test-utils"
import { afterEach, describe, expect, it, vi } from "vitest"
import { defineComponent } from "vue"
import Component from "./Toast.vue"

const toast = {
  id: 1,
  message: "Toast message",
}

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

describe("toast", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders correctly", async () => {
    const wrapper = mount(Component, {
      props: { toast },
      ...global,
    })

    expect(wrapper.text()).toContain("Toast message")
  })

  it("can have custom HTML classes", async () => {
    const wrapper = mount(Component, {
      props: {
        class: "bogus-class",
        wrapperClass: "wrapper-bogus-class",
        toast,
      },
      ...global,
    })

    expect(wrapper.classes()).toContain("wrapper-bogus-class")
    expect(wrapper.find('[data-test-id="body"]').classes()).toContain(
      "bogus-class",
    )
  })
})
