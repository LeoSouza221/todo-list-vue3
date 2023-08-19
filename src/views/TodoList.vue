<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useTodo } from '@/utils/composables/todoComposable'
  import ListTodoItems from '@/components/ListTodoItems.vue'

  const isConclude = ref(false)
  const { todoItems } = useTodo()
  const route = useRoute()

  onMounted(() => {
    if (route.query?.isConclude === 'true') {
      isConclude.value = true
    }
  })
</script>

<template>
  <div class="container-height dark:text-white">
    <div class="flex justify-center">
      <div class="card max-w-[600px] w-[600px] dark:bg-slate-700 dark:text-white">
        <h1 class="text-3xl font-bold py-2">Itens {{ isConclude ? 'concluídos' : 'pendentes' }}</h1>
        <div class="border-b">
        </div>
        <div class="flex">
          <ListTodoItems v-model="todoItems" :is-conclude="isConclude" />
        </div>
      </div>
    </div>
  </div>
</template>