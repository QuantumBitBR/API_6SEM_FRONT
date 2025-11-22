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
type UserRole = 'AGENTE' | 'GESTOR' | 'ADMIN'

// --- PERMISSÕES POR ROLE ---
const permissoes: Record<UserRole, string[]> = {
  AGENTE: ['dashboard', 'chat', 'Perfil',],
  GESTOR: ['dashboard', 'chat', 'Perfil', 'Inteligência Artificial',],
  ADMIN: [
    'dashboard','chat','Perfil','Inteligência Artificial',
    'companies','privacy-policy','Gerenciamento de Usuários'
  ]
}
router.beforeEach((to, from, next) => {
  const privacyStore = usePrivacyStore()

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')?.toUpperCase() as UserRole | null
  const isAccepted = privacyStore.isAccepted

  // 1 — Verifica autenticação
  if (to.meta?.requiresAuth && !token) {
    return next({ name: 'login' })
  }

  // 2 — Controle de ROLE
  if (role && role !== 'ADMIN') {
    const rotasPermitidas = permissoes[role]
    const nomeRota = String(to.name)

    if (!rotasPermitidas.includes(nomeRota)) {
      return next({ name: 'dashboard' })
    }
  }

  // 3 — Verifica se o termo não obrigatório foi aceito
  if (isAccepted === false) {
    const rotasPermitidas = ['profile', 'login', 'dashboard']
    const rotaAtual = String(to.name)

    if (!rotasPermitidas.includes(rotaAtual)) {
      return next({ name: 'profile' })
    }
  }

  next()
})
export default router;
