<script setup lang="ts">
  import { useTodo } from '@/utils/composables/todoComposable'
  import ListTodoItems from '@/components/ListTodoItems.vue'

  const { concludeItems } = useTodo()
</script>

<template>
  <div class="container-height">
    <h1 class="text-3xl font-bold py-2">Itens concluídos</h1>
    <ListTodoItems v-model="concludeItems" is-conclude />
  </div>
</template>