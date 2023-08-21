import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ListTodoItems from '../components/ListTodoItems.vue'

const teste = [{ item: 'teste', id: 1 }]

const wrapper = shallowMount(ListTodoItems, {
  propsData: {
    modelValue: teste,
  }
})

describe('FruitList component test', () => {
  it("tests data attributes", () => {
      expect(wrapper.vm.fruits).toEqual(teste);
  })
})