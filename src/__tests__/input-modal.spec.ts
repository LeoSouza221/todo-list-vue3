import { mount } from '@vue/test-utils'
import InputModel from "../components/InputModel.vue"
import { describe, expect, it } from "vitest"

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