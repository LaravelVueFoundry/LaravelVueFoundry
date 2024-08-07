import Img from "@/stories/assets/test-20x20.jpg"
import { flushPromises, mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component, { type DropdownItem } from "./Dropdown.vue"

function genOptions(
  num: number,
  prefix?: DropdownItem["prefix"],
): DropdownItem[] {
  const options = []

  for (let i = 0; i < num; i++) {
    options.push({
      prefix,
      key: `item_${i}`,
      value: `Item ${i + 1}`,
    } satisfies DropdownItem)
  }

  return options
}

const global = {
  global: {
    stubs: {
      teleport: true,
      transition: true,
    },
  },
}

describe("dropdown", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      props: {},
    })

    expect(wrapper.classes()).toContain("relative")
  })

  it("can have custom HTML classes", () => {
    const wrapper = mount(Component, {
      props: {
        class: "bogus-class",
        wrapperClass: "bogus-wrapper-class",
      },
    })

    expect(wrapper.classes()).toContain("bogus-wrapper-class")
    expect(wrapper.get('[data-test-id="dropdown"]').classes()).toContain(
      "bogus-class",
    )
  })

  it("can be empty", () => {
    const wrapper = mount(Component)

    expect(wrapper.html()).toBeTruthy()
  })

  it("can have a custom placeholder", () => {
    const wrapper = mount(Component, {
      props: {
        placeholder: "placeholder",
      },
    })

    expect(wrapper.get('[data-test-id="dropdown"]').text()).toBe("placeholder")
  })

  it("can have an undefined placeholder", () => {
    const wrapper = mount(Component, {
      props: {
        placeholder: "",
      },
    })

    expect(wrapper.get('[data-test-id="dropdown"]').html()).toContain(">\xa0<")
  })

  it("can be opened", async () => {
    const wrapper = mount(Component, {
      props: {},
      attachTo: document.body,
      ...global,
    })

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new Event("mousedown"))
    await flushPromises()

    expect(wrapper.find('[data-test-id="dropdown-list"]').exists()).toBe(true)
  })

  it("can be required", async () => {
    const wrapper = mount(Component, {
      props: {
        items: genOptions(3),
        required: true,
      },
      attachTo: document.body,
      ...global,
    })

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new Event("mousedown"))
    await flushPromises()

    expect(
      wrapper.findAll('[data-test-id="dropdown-list-item"]')[0].text(),
    ).toBe("Item 1")
  })

  it("can be optional", async () => {
    const wrapper = mount(Component, {
      props: {
        placeholder: "Placeholder",
        items: genOptions(3),
        required: false,
      },
      attachTo: document.body,
      ...global,
    })

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new Event("mousedown"))
    await flushPromises()

    expect(
      wrapper.findAll('[data-test-id="dropdown-list-item"]')[0].text(),
    ).toBe("Placeholder")
  })

  it("can be opened by pressing space", async () => {
    const wrapper = mount(Component, {
      props: {
        items: genOptions(3),
      },
      attachTo: document.body,
      ...global,
    })

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new KeyboardEvent("keydown", { key: "space" }))
    await flushPromises()

    expect(wrapper.find('[data-test-id="dropdown-list"]').exists()).toBe(true)
  })

  it("can be opened by pressing enter", async () => {
    const wrapper = mount(Component, {
      props: {
        items: genOptions(3),
      },
      attachTo: document.body,
      ...global,
    })

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }))
    await flushPromises()

    expect(wrapper.find('[data-test-id="dropdown-list"]').exists()).toBe(true)
  })

  it("can be toggled", async () => {
    const wrapper = mount(Component, {
      props: {
        items: genOptions(3),
      },
      attachTo: document.body,
      ...global,
    })

    wrapper.vm.toggle()
    await flushPromises()

    expect(wrapper.find('[data-test-id="dropdown-list"]').exists()).toBe(true)

    wrapper.vm.toggle()
    await flushPromises()

    expect(wrapper.find('[data-test-id="dropdown-list"]').exists()).toBe(false)
  })

  it("closes when it becomes disabled", async () => {
    const wrapper = mount(Component, {
      props: {
        items: genOptions(3),
      },
      attachTo: document.body,
      ...global,
    })

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new Event("mousedown"))
    await flushPromises()

    wrapper.setProps({ disabled: true })
    await flushPromises()

    expect(wrapper.find('[data-test-id="dropdown-list"]').exists()).toBe(false)
  })

  it("cannot open when disabled", async () => {
    const wrapper = mount(Component, {
      props: {
        disabled: true,
        items: genOptions(3),
      },
      attachTo: document.body,
      ...global,
    })

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new Event("mousedown"))
    await flushPromises()

    expect(wrapper.find('[data-test-id="dropdown-list"]').exists()).toBe(false)

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new KeyboardEvent("keydown", { key: "space" }))
    await flushPromises()

    expect(wrapper.find('[data-test-id="dropdown-list"]').exists()).toBe(false)

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new KeyboardEvent("keydown", { key: "enter" }))
    await flushPromises()

    expect(wrapper.find('[data-test-id="dropdown-list"]').exists()).toBe(false)
  })

  it("can be closed by clicking outside", async () => {
    const wrapper = mount(Component, {
      props: {
        items: genOptions(3),
      },
      attachTo: document.body,
      ...global,
    })

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new Event("mousedown"))
    await flushPromises()

    document.body.click()
    await flushPromises()

    expect(wrapper.find('[data-test-id="dropdown-list"]').exists()).toBe(false)
  })

  it("can be closed with the escape key", async () => {
    const wrapper = mount(Component, {
      props: {
        items: genOptions(3),
      },
      attachTo: document.body,
      ...global,
    })

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new Event("mousedown"))
    await flushPromises()

    await wrapper.trigger("keydown", { key: "Escape" })

    expect(wrapper.find('[data-test-id="dropdown-list"]').exists()).toBe(false)
  })

  it("can select an item", async () => {
    const wrapper = mount(Component, {
      props: {
        items: genOptions(3),
      },
      attachTo: document.body,
      ...global,
    })

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new Event("mousedown"))
    await flushPromises()

    wrapper.vm.selectItem(
      new Event(""),
      wrapper.findAll('[data-test-id="dropdown-list-item"]')[1].attributes()
        .value as unknown as DropdownItem,
    )
    await flushPromises()

    expect(wrapper.find('[data-test-id="dropdown-list"]').exists()).toBe(false)
    expect(wrapper.find('[data-test-id="dropdown"]').text()).toBe("Item 1")

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new KeyboardEvent("keydown", { key: "space" }))
    await flushPromises()

    await wrapper
      .findAll('[data-test-id="dropdown-list-item"]')[2]
      .trigger("keydown", { key: "Space" })

    expect(wrapper.find('[data-test-id="dropdown"]').text()).toBe("Item 2")

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new KeyboardEvent("keydown", { key: "space" }))
    await flushPromises()

    wrapper
      .findAll('[data-test-id="dropdown-list-item"]')[3]
      .element.dispatchEvent(new MouseEvent("click"))
    await flushPromises()

    expect(wrapper.find('[data-test-id="dropdown"]').text()).toBe("Item 3")
  })

  it("can have icons", async () => {
    const wrapper = mount(Component, {
      props: {
        items: genOptions(3, {
          type: "icon",
          value: "mdi:account",
        }),
      },
      attachTo: document.body,
      ...global,
    })

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new Event("mousedown"))
    await flushPromises()

    expect(
      wrapper
        .findAll('[data-test-id="dropdown-list-item"]')[1]
        .find('[data-test-id="dropdown-list-icon"]')
        .exists(),
    ).toBe(true)
  })

  it("can have images", async () => {
    const wrapper = mount(Component, {
      props: {
        items: genOptions(3, {
          type: "image",
          value: Img,
        }),
      },
      attachTo: document.body,
      ...global,
    })

    wrapper
      .get('[data-test-id="dropdown"]')
      .element.dispatchEvent(new Event("mousedown"))
    await flushPromises()

    expect(
      wrapper
        .findAll('[data-test-id="dropdown-list-item"]')[1]
        .find('[data-test-id="dropdown-list-image"]')
        .exists(),
    ).toBe(true)
  })
})
