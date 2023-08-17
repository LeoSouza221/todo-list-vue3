<script setup lang="ts">
  import { reactive } from 'vue'
  import type { TodoItem } from '@/types/todoItem'
  import ListTodoItems from '@/components/ListTodoItems.vue'

  const todoItems: TodoItem[] = reactive([{ item: 'teste 1', id: 1 }, { item: 'teste 2', id: 2 }])
</script>

<template>
  <main>
    <div class="card">
      <ListTodoItems v-model="todoItems" />
    </div>
  </main>
</template>