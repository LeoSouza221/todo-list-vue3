import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputModel from "../components/InputModel.vue"

const teste = ''

const wrapper = mount(InputModel, {
  propsData: {
    modelValue: 'teste'
  }
})

describe('Input component test', () => {
  it("tests data attributes", () => {
      expect(wrapper.vm.modelValue).toEqual('teste');
  })
})