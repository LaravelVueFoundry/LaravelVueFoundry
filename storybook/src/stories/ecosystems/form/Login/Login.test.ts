import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Login.vue'

describe('heading', () => {
  it('renders correctly', () => {
    const wrapper = mount(Component)

    expect(wrapper.text()).toBeTruthy()
  })
})
