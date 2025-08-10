import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'comparison',
      component: () => import('../views/ComparisonView.vue'),
    },
  ],
})

export default router
