<script setup lang="ts">
  import { ref, watch } from 'vue'
  import type { TodoItem } from '@/types/todoItem'
  import { useTodo } from '@/utils/composables/todoComposable'
  import ListTodoItems from '@/components/ListTodoItems.vue'
  import InputModel from '@/components/InputModel.vue'

  const isClear = ref<boolean>(false)
  const inputError = ref<boolean>(true)
  const inputErrorMessage = ref<string>('')
  const todoText = ref<string>('')
  const { todoStore, todoItems, concludeItems } = useTodo()

  watch(todoText, (newValue) => {
    const isOnlySpaces = newValue.replace(/\s/g, '').length

    if (!newValue.length && !isClear.value) {
      inputError.value = true
      inputErrorMessage.value = 'Digite pelo menos 1 caracter'

      return
    }

    if (!isOnlySpaces && !isClear.value) {
      inputError.value = true
      inputErrorMessage.value = 'Itens não devem conter somente espaços'

      return
    }

    inputError.value = false
    isClear.value = false
  })

  function addNewTodoItem() {
    const newTodoItem: TodoItem = { item: todoText.value, id: new Date().getTime() }

    todoStore.addNewTodoItem(newTodoItem)
    clearInput()
  }

  function clearInput() {
    todoText.value = ''
    isClear.value = true
  }
</script>

<template>
  <div class="h-screen flex justify-center items-center p-2">
    <div class="card w-[500px]">
      <div class="flex gap-4">
        <InputModel v-model="todoText" :error="inputError" :error-message="inputErrorMessage" placeholder="Adicione um item a lista" />
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-75 disabled:hover:bg-blue-500 h-10" :disabled="inputError" @click="addNewTodoItem">Adicionar</button>
      </div>

      <div class="py-2">
        <div>
          <router-link class="hover:underline hover:cursor-pointer" to="/todo-list">
            <span class="text-lg font-bold py-2">Itens pendentes</span>
          </router-link>
          <div class="max-h-[200px] overflow-y-auto">
            <ListTodoItems v-model="todoItems" />
          </div>
        </div>

        <div>
          <router-link class="hover:underline hover:cursor-pointer" to="/complete-list">
            <span class="text-lg font-bold py-2">Itens concluídos</span>
          </router-link>
          <div class="max-h-[200px] overflow-y-auto">
            <ListTodoItems v-model="concludeItems" is-conclude />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>