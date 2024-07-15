import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Header.vue'

describe('header', () => {
  it('renders correctly', () => {
    const wrapper = mount(Component, {
    })

    expect(wrapper.element.tagName).toBe('HEADER')
  })

  it('can have custom HTML classes', () => {
    const wrapper = mount(Component, {
      props: {
        class: 'bogus-class',
      },
    })

    expect(wrapper.classes()).toContain('bogus-class')
  })

  it('can be empty', () => {
    const wrapper = mount(Component)

    expect(wrapper.html()).toBeTruthy()
  })

  it('has a desktop menu variant', () => {
    globalThis.innerWidth = 1000
    const wrapper = mount(Component)

    expect(wrapper.find('[data-test-id="menu-desktop"]').exists()).toBe(true)
    expect(wrapper.find('[data-test-id="menu-mobile"]').exists()).toBe(false)
  })

  it('has a mobile menu variant', () => {
    globalThis.innerWidth = 500
    const wrapper = mount(Component)

    expect(wrapper.find('[data-test-id="menu-desktop"]').exists()).toBe(false)
    expect(wrapper.find('[data-test-id="menu-mobile"]').exists()).toBe(true)
  })
})
