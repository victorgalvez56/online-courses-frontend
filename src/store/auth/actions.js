
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
        reject(err)
        return Promise.reject(error)
    }
}
export function register({ commit }, user) {

    console.warn(user)
    return new Promise((resolve, reject) => {
        commit('auth_request')
        axiosInstance({ url: 'http://0.0.0.0:4000/api/auth/signup', data: user, method: 'POST' })
            .then(resp => {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)
                axiosInstance.defaults.headers.common['Authorization'] = token
                Notify.create({
                    message: 'Registro exitoso',
                    color: 'positive',
                    icon: 'check'
                })
                commit('auth_success', token, user)
                resolve(resp)
            })
            .catch(err => {
                Notify.create({
                    message: 'Registro sin éxito',
                    color: 'negative',
                    icon: 'check'
                })
                commit('auth_error', err)
                localStorage.removeItem('token')
                reject(err)
            })
    })
}

export function logout({ commit }) {
    return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axiosInstance.defaults.headers.common['Authorization']
        resolve()
    })
}