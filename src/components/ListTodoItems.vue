<script setup lang="ts">
  import { computed, ref, reactive } from 'vue'
  import type { TodoItem } from '@/types/todoItem'
  import { useTodoStore } from '@/stores/manageTodoList'
  import IconClose from '@/components/icons/IconClose.vue'
  import IconEdit from '@/components/icons/IconEdit.vue'
  import IconCheck from '@/components/icons/IconCheck.vue'
  import ModalComponent from '@/components/ModalComponent.vue'
  import EditModal from './EditModal.vue'
  import { useDarkMode } from '@/utils/composables/darkMode'

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
  const emit = defineEmits(['update:modelValue'])
  
  const todoStore = useTodoStore()
  const { isDarkMode } = useDarkMode()

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
      todoStore.removeItem(index)
      return
    }

    todoStore.removeItem(selectedItem.value)
  }

  function concludeItem() {
    todoStore.addToConclude(selectedItem.value)
    isConcludeModalOpen.value = false

    removeItem()
  }
</script>

<template>
  <TransitionGroup name="list" tag="ul" class="py-2 w-full dark:text-white" v-if="todoItems?.length">
    <li v-for="(todoItem, index) in todoItems" :key="index" class="grid grid-cols-12 gap-2 py-1 items-center">
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
    </li>
  </TransitionGroup>

  <div v-else class="w-full text-center opacity-25 p-4">
    <p>Não há itens</p>
  </div>

  <EditModal v-model:modal-value="todoEdit" v-model:is-modal-open="isModalOpen" />

  <ModalComponent v-model="isConcludeModalOpen">
    <div class="card w-[300px] dark:bg-slate-700 dark:text-white" :class="isDarkMode ? 'dark' : ''">
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

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
