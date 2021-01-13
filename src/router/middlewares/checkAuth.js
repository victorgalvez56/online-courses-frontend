/* eslint-disable no-unused-vars */
import store from 'src/store/auth'

export default async (to, from, next) => {

    const rutaProtegida = to.matched.some(record => record.meta.requireAuth);

    console.warn(store.state().token)
    if (!rutaProtegida && store.state().token === null) {
      next({name: 'Login'})
    }
    next()
}