
import dashboardPage from './pages/admin'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
      
    ],
    meta: {requireAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('components/Login.vue'),
    meta: {requireAuth: true}

  },
  {
    path: '/register',
    component: () => import('components/Register.vue'),

  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  dashboardPage
]


export default routes
