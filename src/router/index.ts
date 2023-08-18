import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: () => import('../pages/SubscriptionPage.vue'),
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import('../pages/PlayListPage.vue'),
    },
  ],
})

export default router
