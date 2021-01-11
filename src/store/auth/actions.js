
import { axiosInstance } from 'src/boot/axios'
import { Notify } from 'quasar'


export async function login({ commit }, user) {
    try {
        const { data } = await axiosInstance.post('/auth/signin', user)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        commit('auth_success', data.token, data.user)
        Notify.create({
            message: 'Inicio de sesión exitoso',
            color: 'positive',
            icon: 'check'
        })
        return data
    } catch (error) {
        Notify.create({
            message: 'Inicio de sesión sin éxito',
            color: 'negative',
            icon: 'error'
        })
        commit('auth_error')
        localStorage.removeItem('token')
        return error
    }
}
export async function register({ commit }, user) {

    console.warn(user)
    try {
        const { data } = await axiosInstance.post('/auth/signup', user)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        commit('auth_success', data.token, data.user)
        Notify.create({
            message: 'Registro de usurio exitoso',
            color: 'positive',
            icon: 'check'
        })
        return data
    } catch (error) {
        Notify.create({
            message: 'Registro de usurio sin éxito',
            color: 'negative',
            icon: 'error'
        })
        commit('auth_error')
        localStorage.removeItem('token')
        return error
    }
}

export function logout({ commit }) {
    return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axiosInstance.defaults.headers.common['Authorization']
        resolve()
    })
}