
import dashboardPage from './pages/admin'
import orders from './pages/orders'


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
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('components/Login.vue'),
        meta: {requireAuth: true}
      }
    ],
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
  dashboardPage,
  orders
]


export default routes
