<script setup lang="ts">
  import { onMounted, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import type { TodoItem } from '@/types/todoItem'
  import { useTodoStore } from '@/stores/manageTodoList'
  import ListTodoItems from '@/components/ListTodoItems.vue'

  const todoStore = useTodoStore()
  const { concludeItems } = storeToRefs(todoStore)

  onMounted(() => {
    const localConcludeItems: TodoItem[] = localStorage["conclude-items"] ? JSON.parse(localStorage.getItem("conclude-items") ?? "") : []
    const emptyTodo: TodoItem[] = []

    if (localConcludeItems.length) {
      concludeItems.value = emptyTodo.concat(localConcludeItems)
    }
  })

  watch(concludeItems.value, (newValue) => {
    updateLocalStorage('todo-items', newValue)
  })

  function updateLocalStorage(item: string, newValue: TodoItem[]) {
    localStorage.setItem(item, JSON.stringify(newValue))
  }
</script>

<template>
  <div class="container-height">
    <h1 class="text-3xl font-bold py-2">Itens concluídos</h1>
    <ListTodoItems v-model="concludeItems" is-conclude />
  </div>
</template>