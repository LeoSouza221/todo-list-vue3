import { defineStore } from "pinia"
import type { TodoItem } from '@/types/todoItem'

export const useTodoStore = defineStore('counter', {
  state: () => ({
    todoItems: [] as TodoItem[],
    concludeItems: [] as TodoItem[]
  }),
  actions: {
    removeItem(index: number) {
      this.todoItems.splice(index, 1)
    },
    changeTodoItem(todoItem: TodoItem) {
      const { id } = todoItem
      const position = this.todoItems.findIndex((item) => item.id === id)
  
      if (position >= 0) {
        this.todoItems[position] = { ...todoItem }
      }
    },
    addNewTodoItem(todoItem: TodoItem) {
      this.todoItems.push(todoItem)
    },
    addToConclude(index: number) {
      this.concludeItems.push(this.todoItems[index])
    }
  },
})