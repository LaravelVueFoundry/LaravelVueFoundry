import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Component from "./Login.vue"

describe("login", () => {
  it("renders correctly", () => {
    const wrapper = mount(Component)

    expect(wrapper.text()).toBeTruthy()
  })
})
