import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from "vitest";
import { createTestingPinia } from '@pinia/testing'
import ListTodoItems from '../components/ListTodoItems.vue'

const teste = [{ item: 'teste', id: 1 }]

const wrapper = shallowMount(ListTodoItems, {
  global: {
    plugins: [createTestingPinia()],
  },
  propsData: {
    modelValue: teste,
  }
})

describe('FruitList component test', () => {
  it("tests data attributes", () => {
      expect(wrapper.vm.modelValue).toEqual(teste);
  })
})