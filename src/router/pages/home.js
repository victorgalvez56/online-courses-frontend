export default {
  path: '/',
  name: 'home',
  component: () => import('src/pages/home/Index'),
  children: [
    {
      path: 'buscar_tipo',
      name: 'searchbykind',
      component: () => import('pages/admin/SearchbyKind')
    },

  ]
}
