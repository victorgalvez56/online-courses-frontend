export default {
  path: '/buscar_tipo',
  name: 'buscar_tipo',
  component: () => import('layouts/MainLayout'),
  children: [
    {
      path: '/:id',
      name: 'searchbykind',
      component: () => import('pages/admin/SearchbyKind')
    },

  ]
}
