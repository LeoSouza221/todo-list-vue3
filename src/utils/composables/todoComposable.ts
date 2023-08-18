import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/manageTodoList'
import type { TodoItem } from '@/types/todoItem'

export function useTodo() {
  const todoStore = useTodoStore()
  const { todoItems, concludeItems } = storeToRefs(todoStore)

  onMounted(() => {
    const localTodoItems: TodoItem[] = localStorage["todo-items"] ? JSON.parse(localStorage.getItem("todo-items") ?? "") : []
    const localConcludeItems: TodoItem[] = localStorage["conclude-items"] ? JSON.parse(localStorage.getItem("conclude-items") ?? "") : []
    const emptyTodo: TodoItem[] = []

    if (localTodoItems.length) {
      todoItems.value = emptyTodo.concat(localTodoItems)
    }

    if (localConcludeItems.length) {
      concludeItems.value = emptyTodo.concat(localConcludeItems)
    }
  })

  watch(
    () => todoItems.value,
    (newValue) => {
      updateLocalStorage('todo-items', newValue)
    },
    { deep: true }
  )

  watch(
    () => concludeItems.value,
    (newValue) => {
      updateLocalStorage('conclude-items', newValue)
    },
    { deep: true }
  )
  
  function updateLocalStorage(item: string, newValue: TodoItem[]) {
    localStorage.setItem(item, JSON.stringify(newValue))
  }

  return { todoStore, todoItems, concludeItems }
}