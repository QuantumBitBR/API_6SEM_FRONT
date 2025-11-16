import { createRouter, createWebHistory } from 'vue-router'
import { usePrivacyStore } from '@/stores/privacy';

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
    {
      path: '/profile',
      name: 'Perfil',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/privacy-policy',
      name: 'Termo de Privacidade',
      component: () => import('../views/PrivacyPolicyView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user-management',
      name: 'Gerenciamento de Usuários',
      component: () => import('../views/UserManagementView.vue'),
      meta: { requiresAuth: true }
    },
  ],
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  
  const isAccepted = localStorage.getItem("is_accept_unmandatory");

  if (to.meta?.requiresAuth && !token) return next({ name: "login" });

  if (isAccepted === "false") {
    const rotasPermitidas = ["Perfil", "login", "dashboard"];
    const rotaAtual = typeof to.name === "string" && to.name ? to.name : (typeof to.path === "string" ? to.path : "");

    if (!rotasPermitidas.includes(rotaAtual)) return next({ name: "Perfil" });
  }

  return next();
});


export default router;
