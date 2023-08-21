import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputModel from "../InputModel.vue"

const wrapper = mount(InputModel, {
  propsData: {
    modelValue: 'test',
    error: false
  }
})

describe('Input component test', () => {
  it("tests model value", () => {
      expect(wrapper.vm.modelValue).toEqual('test');
  })

  it("tests input type", async () => {
    const textInput = wrapper.find('input[type="text"]')
    await textInput.setValue('some value')

    expect(wrapper.find('input[type="text"]').element.value).toEqual('some value')
  })

  it("tests error props", async () => {
    expect(wrapper.vm.error).toBe(false)

    await wrapper.setProps({ error: true })
    
    expect(wrapper.vm.error).toBe(true)
  })

  it("tests error message", async () => {
    const span = wrapper.find('span')

    await wrapper.setProps({ error: false, errorMessage: 'Error message' })

    expect(wrapper.vm.errorMessage).toEqual('Error message')

    expect(span.isVisible()).toBe(false)
    expect(span.exists()).toBe(true)
    expect(span.classes()).toContain('text-red-500')

    await wrapper.setProps({ error: true })

    expect(span.text()).toBe('Error message')
  })
})