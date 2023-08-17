<script setup lang="ts">
  import { ref, reactive, watch } from 'vue'
  import type { TodoItem } from '@/types/todoItem'
  import ListTodoItems from '@/components/ListTodoItems.vue'
  import InputModel from '@/components/InputModel.vue'

  const todoText = ref<string>('')
  const todoItems: TodoItem[] = reactive([{ item: 'teste 1', id: 1 }, { item: 'teste 2', id: 2 }])
  const concludeItems: TodoItem[] = reactive([{ item: 'teste 1', id: 3 }])

  watch(todoItems, (newValue, oldValue) => {
    updateLocalStorage()
  })

  function addNewTodoItem() {
    todoItems.push({ item: todoText.value, id: new Date().getTime() })
    clearInput()
  }

  function addToConclude(index: number) {
    concludeItems.push(todoItems[index])
  }

  function clearInput() {
    todoText.value = ''
  }

  function updateLocalStorage() {
    
  }
</script>

<template>
  <main class="card w-[500px]">
    <div class="flex gap-4">
      <InputModel v-model="todoText" />
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="addNewTodoItem">Adicionar</button>
    </div>

    <div class="py-2">
      <div>
        <a class="hover:underline hover:cursor-pointer" to="">
          <h3 class="text-lg font-bold py-2">Itens pendentes</h3>
        </a>
        <ListTodoItems v-model="todoItems" @add-to-conclude="addToConclude" />
      </div>

      <div>
        <a class="hover:underline hover:cursor-pointer" to="">
          <h3 class="text-lg font-bold py-2">Itens concluídos</h3>
        </a>
        <ListTodoItems v-model="concludeItems" is-conclude />
      </div>
    </div>
  </main>
</template>