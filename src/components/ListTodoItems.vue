<script setup lang="ts">
  import { computed, ref, reactive } from 'vue'
  import type { TodoItem } from '@/types/todoItem'
  import IconClose from '@/components/icons/IconClose.vue'
  import IconEdit from '@/components/icons/IconEdit.vue'
  import IconCheck from '@/components/icons/IconCheck.vue'
  import ModalComponent from '@/components/ModalComponent.vue'
  import InputModel from '@/components/InputModel.vue'

  const props = defineProps({
    modelValue: {
      type: Array<TodoItem>,
      required: true
    },
    isConclude: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:modelValue', 'addToConclude'])

  const isModalOpen = ref(false)
  const isConcludeModalOpen = ref(false)
  const selectedItem = ref(0)
  let todoEdit: TodoItem = reactive({ item: '', id: 0 })

  const todoItems = computed({
    get() {
      return props.modelValue
    },
    set(newValue) {
      emit('update:modelValue', newValue)
    }
  })

  function confirmConclusion(index: number) {
    selectedItem.value = index

    isConcludeModalOpen.value = true
  }

  function editItem(index: number) {
    isModalOpen.value = true
    todoEdit = { ...todoItems.value[index] }
  }

  function removeItem(index?: number) {
    if (index) {
      todoItems.value.splice(index, 1)
      return
    }

    todoItems.value.splice(selectedItem.value, 1)
  }

  function concludeItem() {
    emit('addToConclude', selectedItem.value)
    isConcludeModalOpen.value = false

    removeItem()
  }

  function changeTodoItem() {
    const { id } = todoEdit
    const position = todoItems.value.findIndex((item) => item.id === id)

    if (position >= 0) {
      todoItems.value[position] = { ...todoEdit }
    }

    isModalOpen.value = false
  }
</script>

<template>
  <div class="py-2">
    <div class="grid grid-cols-12 gap-2 py-1 items-center" v-for="(todoItem, index) in todoItems" :key="index">
      <div class="col-span-9 text-start" :class="`col-span-${isConclude ? '12' : '9'}`">
        <span class="text-sm" :class="isConclude ? 'line-through' : ''">{{ todoItem.item }}</span>
      </div>
      <div v-if="!isConclude" class="col-span-3 flex justify-end gap-2">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded-full" @click="editItem(index)">
          <IconEdit />
        </button>
        <button class="bg-red-600 hover:bg-red-500 text-white font-bold p-1 rounded-full" @click="removeItem(index)">
          <IconClose />
        </button>
        <button class="bg-green-600	hover:bg-green-500 text-white font-bold p-1 rounded-full" @click="confirmConclusion(index)">
          <IconCheck />
        </button>
      </div>
    </div>
  </div>

  <ModalComponent v-model="isModalOpen">
    <div class="card w-[400px]">
      <div>
        <h3 class="text-2xl">Editar tarefa</h3>
      </div>
      <div class="py-2">
        <InputModel v-model="todoEdit.item" />
      </div>

      <div class="pt-2 flex justify-between">
        <button class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded" @click="isModalOpen = false">Cancelar</button>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="changeTodoItem">Confirmar</button>
      </div>
      
    </div>
  </ModalComponent>

  <ModalComponent v-model="isConcludeModalOpen">
    <div class="card w-[300px]">
      <div class="py-2 text-center">
        <p>Tem certeza que deseja finalizar o item?</p>
      </div>

      <div class="pt-2 flex justify-between">
        <button class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded" @click="isConcludeModalOpen = false">Cancelar</button>

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="concludeItem">Confirmar</button>
      </div>
      
    </div>
  </ModalComponent>
</template>