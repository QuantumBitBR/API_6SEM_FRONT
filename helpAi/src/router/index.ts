import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/all',
      name: 'all',
      component: () => import('../views/CompaniesUsersView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/SearchTicketsView.vue')
    },
  ],
})

export default router
