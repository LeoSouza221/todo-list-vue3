import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/todo-list',
      name: 'todo-list',
      component: () => import('@/views/TodoList.vue')
    },
    {
      path: '/complete-list',
      name: 'complete-list',
      component: () => import('@/views/TodoListComplete.vue')
    },
  ]
})

export default router
