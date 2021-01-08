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
    }
  ]
}
