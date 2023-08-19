<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDarkMode } from '@/utils/composables/darkMode'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const { isDarkMode, applyDarkMode } = useDarkMode()
</script>

<template>
  <div :class="isDarkMode ? 'dark' : ''">
    <HeaderComponent :toggle-dark="applyDarkMode" :is-dark-mode="isDarkMode" />
    <main class="w-full container-height bg-zinc-50 dark:bg-slate-900">
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>
