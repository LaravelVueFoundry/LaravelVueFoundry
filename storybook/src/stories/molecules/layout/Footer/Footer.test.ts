import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import Component from './Footer.vue'

const TransitionStub = defineComponent({
  emits: ['afterEnter', 'afterLeave'],
  template: '<div><slot /></div>',
  setup(_, { emit }) {
    return {
      async emitAfterEnter() {
        await flushPromises()
        emit('afterEnter')
      },
      async emitAfterLeave() {
        await flushPromises()
        emit('afterLeave')
      },
    }
  },
})

const global = {
  global: {
    stubs: {
      teleport: true,
      transition: TransitionStub,
    },
  },
}

describe('footer', () => {
  it('renders correctly', () => {
    const wrapper = mount(Component, {
      ...global,
    })

    expect(wrapper.element.tagName).toBe('FOOTER')
  })

  it('can have custom HTML classes', () => {
    const wrapper = mount(Component, {
      props: {
        class: 'bogus-class',
      },
      ...global,
    })

    expect(wrapper.classes()).toContain('bogus-class')
  })

  it('can be empty', () => {
    const wrapper = mount(Component)

    expect(wrapper.html()).toBeTruthy()
  })
})
