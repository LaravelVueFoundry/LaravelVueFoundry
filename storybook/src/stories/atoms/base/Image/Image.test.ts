import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Image.vue'

describe('image', () => {
  it('renders correctly', () => {
    const wrapper = mount(Component, {
      props: {
        src: '',
        alt: '',
      },
    })

    expect(wrapper.element.tagName).toBe('IMG')
  })

  it('can have custom HTML classes', () => {
    const wrapper = mount(Component, {
      props: {
        class: 'bogus-class',
        src: '',
        alt: '',
      },
    })

    expect(wrapper.classes()).toContain('bogus-class')
  })

  it('can have a width and height', () => {
    const wrapper = mount(Component, {
      props: {
        src: '',
        alt: '',
        height: 16,
        width: 32,
      },
    })

    expect(wrapper.attributes().height).toBe('16px')
    expect(wrapper.attributes().width).toBe('32px')
  })
})
