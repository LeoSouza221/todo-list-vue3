<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useTodo } from '@/utils/composables/todoComposable'
  import ListTodoItems from '@/components/ListTodoItems.vue'
  import IconBack from '@/components/icons/IconBack.vue'

  const isConclude = ref(false)
  const { todoItems, concludeItems } = useTodo()
  const route = useRoute()

  onMounted(() => {
    if (route.query?.isConclude === 'true') {
      isConclude.value = true
    }
  })
</script>

<template>
  <div class="py-3 dark:text-white">
    <div class="py-3 md:absolute">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded-full" @click="$router.go(-1)">
        <IconBack />
      </button>
    </div>
    <div class="flex justify-center">
      <div class="card max-w-[600px] w-[600px] dark:bg-slate-700 dark:text-white">
        <h1 class="text-3xl font-bold py-2">Itens {{ isConclude ? 'concluídos' : 'pendentes' }}</h1>
        <div class="border-b">
        </div>
        <div class="flex">
          <ListTodoItems v-if="isConclude" v-model="concludeItems" :is-conclude="isConclude" />
          <ListTodoItems v-else v-model="todoItems" />
        </div>
      </div>
    </div>
  </div>
</template>