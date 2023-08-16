<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import IconClose from '@/components/icons/IconClose.vue'
  import IconEdit from '@/components/icons/IconEdit.vue'
  import ModalComponent from '@/components/ModalComponent.vue'
  import InputModel from '@/components/InputModel.vue'

  interface TodoItem {
    item: string
    id: number
  }

  const isModalOpen = ref(false)
  const todoText = ref<string>('')
  let todoEdit: TodoItem = reactive({ item: '', id: 0 })
  const todoItems: TodoItem[] = reactive([{ item: 'teste 1', id: 1 }, { item: 'teste 1', id: 2 }])
  const concludeItems: TodoItem[] = reactive([{ item: 'teste 1', id: 3 }])

  function addNewTodoItem() {
    todoItems.push({ item: todoText.value, id: new Date().getTime() })
    clearInput()
  }

  function removeItem(index: number) {
    todoItems.splice(index, 1)
  }

  function clearInput() {
    todoText.value = ''
  }

  function concludeItem(index: number) {
    concludeItems.push(todoItems[index])

    removeItem(index)
  }

  function editItem(index: number) {
    isModalOpen.value = true
    todoEdit = { ...todoItems[index] }
  }
</script>

<template>
  <main class="card w-[500px]">
    <div class="flex gap-4">
      <input
        class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        type="text"
        v-model="todoText"
      >
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="addNewTodoItem">Adicionar</button>
    </div>

    <div class="py-2">
      <div class="py-2">
        <h3 class="text-lg">Itens pendentes</h3>
        <div class="flex gap-2 py-1" v-for="(todoItem, index) in todoItems" :key="index">
          <input
            class="w-4 h-4 border-2 border-blue-500 rounded-sm bg-white"
            type="checkbox"
            @click="concludeItem(index)"
          >
          <span class="text-sm">{{ todoItem.item }}</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded-full" @click="editItem(index)">
            <IconEdit></IconEdit>
          </button>
          <button class="bg-red-600 hover:bg-red-500 text-white font-bold p-1 rounded-full" @click="removeItem(index)">
            <IconClose></IconClose>
          </button>
        </div>
      </div>

      <div class="pt-2">
        <h3 class="text-lg">Itens concluídos</h3>
        <div v-for="(todoItem, index) in concludeItems" :key="index">
          <span class="text-sm line-through">{{ todoItem.item }}</span>
        </div>
      </div>
    </div>
    <ModalComponent v-model:is-modal-open="isModalOpen">
      <div class="card w-[400px]">
        <InputModel v-model="todoEdit.item" />

        <div class="flex">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="isModalOpen = false">Cancelar</button>

          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="isModalOpen = false">Confirmar</button>
        </div>
        
      </div>
    </ModalComponent>
  </main>
</template>