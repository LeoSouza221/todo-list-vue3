<script setup lang="ts">
  import { onMounted, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import type { TodoItem } from '@/types/todoItem'
  import { useTodoStore } from '@/stores/manageTodoList'
  import ListTodoItems from '@/components/ListTodoItems.vue'

  const todoStore = useTodoStore()
  const { todoItems } = storeToRefs(todoStore)

  onMounted(() => {
    const localTodoItems: TodoItem[] = localStorage["todo-items"] ? JSON.parse(localStorage.getItem("todo-items") ?? "") : []
    const emptyTodo: TodoItem[] = []

    if (localTodoItems.length) {
      todoItems.value = emptyTodo.concat(localTodoItems)
    }
  })

  watch(todoItems.value, (newValue) => {
    updateLocalStorage('todo-items', newValue)
  })

  function updateLocalStorage(item: string, newValue: TodoItem[]) {
    localStorage.setItem(item, JSON.stringify(newValue))
  }
</script>

<template>
  <div class="container-height">
    <h1 class="text-3xl font-bold py-2">Itens pendentes</h1>
    <ListTodoItems v-model="todoItems" />
  </div>
</template>