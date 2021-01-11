import auth from '../middlewares/checkAuth'
import rol from '../middlewares/checkRol'

export default {
  path: '/admin',
  beforeEnter: auth,
  beforeEnter: rol,
  component: () => import('layouts/MainAdmin'),
  children: [
    {
      path: '/',
      name: 'admin',
      component: () => import('pages/admin/Index')
    },
    {
      path: 'products',
      name: 'products',
      component: () => import('pages/admin/products/Index')
    },
    {
      path: 'kinds',
      name: 'kinds',
      component: () => import('pages/admin/kinds/Index')
    },
    {
      path: 'categories',
      name: 'products',
      component: () => import('pages/admin/categories/Index')
    }
  ]
}
