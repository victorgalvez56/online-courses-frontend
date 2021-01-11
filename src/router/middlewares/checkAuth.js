/* eslint-disable no-unused-vars */
import store from 'src/store/auth'

export default async (to, from, next) => {

    const rutaProtegida = to.matched.some(record => record.meta.requireAuth);

    if (!rutaProtegida && store.state().token === null) {
      next({name: 'Login'})
    } else {
      next()
    }

}