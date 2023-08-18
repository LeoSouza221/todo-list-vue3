<script setup lang="ts">
  import { useTodo } from '@/utils/composables/todoComposable'
  import ListTodoItems from '@/components/ListTodoItems.vue'

  const { todoItems } = useTodo()
</script>

<template>
  <div class="container-height">
    <h1 class="text-3xl font-bold py-2">Itens pendentes</h1>
    <ListTodoItems v-model="todoItems" />
  </div>
</template>