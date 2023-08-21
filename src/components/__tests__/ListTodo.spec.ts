import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import ListTodoItems from '../ListTodoItems.vue'

const todoList = [{ item: 'teste', id: 1 }]

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

const wrapper = mount(ListTodoItems, {
  propsData: {
    modelValue: todoList,
  },
  global: {
    plugins: [
      createTestingPinia({
        createSpy: vi.fn,
      }),
    ],
  },
})

describe('ListTodo component test', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("tests model value", () => {
    expect(wrapper.vm.modelValue).toEqual(todoList);
  })

  it("tests list length", () => {
    const list = wrapper.findAll('li')

    expect(list.length).toEqual(1);
  })

  it("tests list text", () => {
    const list = wrapper.findAll('li')
    const span = list[0].find('span')

    expect(span.isVisible()).toBe(true)
    expect(span.exists()).toBe(true)

    expect(span.text()).toBe('teste')
  })

  it("should buttons be visible", () => {
    const buttons = wrapper.findAll('button')
    const buttonBlue = wrapper.findAll('button').at(0)
    const buttonRed = wrapper.findAll('button').at(1)
    const buttonGreen = wrapper.findAll('button').at(2)


    expect(buttonBlue?.classes()).toContain('bg-blue-500')
    expect(buttonBlue?.isVisible()).toBe(true)

    expect(buttonRed?.classes()).toContain('bg-red-600')
    expect(buttonRed?.isVisible()).toBe(true)

    expect(buttonGreen?.classes()).toContain('bg-green-600')
    expect(buttonGreen?.isVisible()).toBe(true)

    expect(buttons.length).toEqual(3)
  })


  it("should buttons not be visible", async () => {
    await wrapper.setProps({ isConclude: true })

    const buttons = wrapper.findAll('button')

    expect(buttons.length).toEqual(0)

    expect(true).toBe(true)
  })


  it("tests add item to the list", async () => {
    await wrapper.setProps(
      { modelValue: [ 
          { item: 'teste', id: 1 },
          { item: 'teste 2', id: 2 },
        ]
      }
    )

    const list = wrapper.findAll('li')

    expect(list.length).toEqual(2);
  })
})