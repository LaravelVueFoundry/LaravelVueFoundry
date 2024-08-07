import { flushPromises, mount } from "@vue/test-utils"
import { DataTransfer, File } from "happy-dom"
import { describe, expect, it } from "vitest"
import Component from "./FileUpload.vue"

describe("fileUpload", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component, {
      slots: {},
    })

    expect(
      wrapper.get('[data-test-id="file-upload-input"]').element.tagName,
    ).toBe("INPUT")
  })

  it("can have custom HTML classes", () => {
    const wrapper = mount(Component, {
      props: {
        class: "bogus-class",
      },
    })

    expect(
      wrapper.get('[data-test-id="file-upload-wrapper"]').classes(),
    ).toContain("bogus-class")
  })

  it("can be empty", () => {
    const wrapper = mount(Component)

    expect(wrapper.html()).toBeTruthy()
  })

  it("can open a file picker", async () => {
    const wrapper = mount(Component)

    ;(wrapper.vm as unknown as { pickFile: () => void }).pickFile()
    await wrapper.get('[data-test-id="file-upload-wrapper"]').trigger("click")
    await flushPromises()
  })

  it("can have a file selected", async () => {
    const wrapper = mount(Component)
    const input = wrapper.get('[data-test-id="file-upload-input"]')
    const container = new DataTransfer()
    container.items.add(new File(["test-data"], "test.txt"))

    input.element.dispatchEvent(new Event("change"))
    await flushPromises()

    expect((wrapper.vm as unknown as typeof Component).fileList.length).toBe(0)
    ;(input.element as HTMLInputElement).files =
      container.items as unknown as FileList
    await input.trigger("change")
    await flushPromises()

    expect((wrapper.vm as unknown as typeof Component).fileList.length).toBe(1)
  })

  it("can have a file cleared", async () => {
    const wrapper = mount(Component)
    const input = wrapper.get('[data-test-id="file-upload-input"]')
    const container = new DataTransfer()
    container.items.add(new File(["test-data"], "test.txt"))
    ;(input.element as HTMLInputElement).files =
      container.items as unknown as FileList
    await input.trigger("change")
    await flushPromises()

    expect((wrapper.vm as unknown as typeof Component).fileList.length).toBe(1)
    wrapper.get('[data-test-id="file-upload-clear"]').trigger("click")
  })
})
