import { describe, it, expect, beforeEach } from 'vitest'
import { useTodo } from "../todoComposable"
import { setActivePinia, createPinia } from 'pinia'

describe('Todo composable test', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it("tests todo list empty length", () => {
    const { todoItems, concludeItems } = useTodo()

    expect(todoItems.value.length).toBe(0)
    expect(concludeItems.value.length).toBe(0)
  })
  it("tests todo list add item", () => {
    const { todoStore, todoItems, concludeItems } = useTodo()

    todoStore.addNewTodoItem({ item: 'teste', id: 1 })

    expect(todoItems.value.length).toBe(1)
    expect(concludeItems.value.length).toBe(0)
  })
  it("tests todo list remove item", () => {
    const { todoStore, todoItems, concludeItems } = useTodo()

    todoStore.addNewTodoItem({ item: 'teste', id: 1 })

    expect(todoItems.value.length).toBe(1)
    expect(concludeItems.value.length).toBe(0)

    todoStore.removeItem(0)

    expect(todoItems.value.length).toBe(0)
    expect(concludeItems.value.length).toBe(0)
  })
  it("tests todo list add to conclude list", () => {
    const { todoStore, todoItems, concludeItems } = useTodo()

    todoStore.addNewTodoItem({ item: 'teste', id: 1 })

    expect(todoItems.value.length).toBe(1)
    expect(concludeItems.value.length).toBe(0)

    todoStore.addToConclude(0)

    expect(concludeItems.value.length).toBe(1)
  })
  it("tests todo list change item", () => {
    const { todoStore, todoItems } = useTodo()
    const todoItem = { item: 'teste', id: 1 }

    todoStore.addNewTodoItem(todoItem)

    expect(todoItems.value.length).toBe(1)

    todoStore.changeTodoItem({ item: 'teste 2', id: 1 })

    expect(todoItems.value[0].item).toBe('teste 2')
  })
})