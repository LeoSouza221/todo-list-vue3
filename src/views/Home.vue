<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import type { TodoItem } from '@/types/todoItem'
  import { useTodoStore } from '@/stores/manageTodoList'
  import ListTodoItems from '@/components/ListTodoItems.vue'
  import InputModel from '@/components/InputModel.vue'

  const todoText = ref<string>('')
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

  watch(todoItems.value, (newValue) => {
    updateLocalStorage('todo-items', newValue)
  })

  watch(concludeItems.value, (newValue) => {
    updateLocalStorage('conclude-items', newValue)
  })

  function addNewTodoItem() {
    const newTodoItem = { item: todoText.value, id: new Date().getTime() }

    todoStore.addNewTodoItem(newTodoItem)
    clearInput()
  }

  function clearInput() {
    todoText.value = ''
  }

  function updateLocalStorage(item: string, newValue: TodoItem[]) {
    localStorage.setItem(item, JSON.stringify(newValue))
  }
</script>

<template>
  <div class="h-screen flex justify-center items-center p-2">
    <div class="card w-[500px]">
      <div class="flex gap-4">
        <InputModel v-model="todoText" />
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="addNewTodoItem">Adicionar</button>
      </div>

      <div class="py-2">
        <div>
          <router-link class="hover:underline hover:cursor-pointer" to="/todo-list">
            <span class="text-lg font-bold py-2">Itens pendentes</span>
          </router-link>
          <ListTodoItems v-model="todoItems" />
        </div>

        <div>
          <router-link class="hover:underline hover:cursor-pointer" to="/complete-list">
            <span class="text-lg font-bold py-2">Itens concluídos</span>
          </router-link>
          <ListTodoItems v-model="concludeItems" is-conclude />
        </div>
      </div>
    </div>
  </div>
</template>