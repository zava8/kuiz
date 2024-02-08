import { createRouter, createWebHistory } from 'vue-router'
import Quiz from '@/views/Quiz.vue'
import Home from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/question/:id',
      name: 'quiz',
      component: Quiz,
      meta: { transition: 'slide-fade' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Notfound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
