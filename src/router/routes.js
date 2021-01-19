
import dashboardPage from './pages/admin'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/sign',
        component: () => import('components/Sign.vue'),
        meta: {requireAuth: true}
      },
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
    name: 'Register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('components/Register.vue'),
        meta: {requireAuth: true}
      }
    ],
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
  dashboardPage
]


export default routes
