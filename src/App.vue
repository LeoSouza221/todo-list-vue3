<script setup lang="ts">
import { RouterView } from 'vue-router'
import TodoList from '@/views/TodoList.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <HeaderComponent />
  <main class="w-full h-screen flex justify-center items-center p-2">
    <TodoList />
    <RouterView />
  </main>
  <FooterComponent />
</template>
