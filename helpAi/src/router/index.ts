import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/companies',
      name: 'companies',
      component: () => import('../views/CompaniesUsersView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/SearchTicketsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/ai',
      name: 'Inteligência Artificial',
      component: () => import('../views/AIDashboardView.vue'),
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next({ name: "login" });
  } else {
    next();
  }
});


export default router
