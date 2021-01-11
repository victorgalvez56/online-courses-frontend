
import { axiosInstance } from 'src/boot/axios'
import { Notify } from 'quasar'


export async function createProduct({ commit }, product) {
    try {
        const { data } = await axiosInstance.post('/item', product)
        Notify.create({
            message: 'Registro exitoso',
            color: 'positive',
            icon: 'check'
        })
        return data
    } catch (error) {
        Notify.create({
            message: 'Registro sin éxito',
            color: 'negative',
            icon: 'error'
        })
        return error
    }
}

export async function readProducts({ commit }) {
    try {
        const { data } = await axiosInstance.get('/item')


        commit('SET_PRODUCTS', data)
        return  data
    } catch (error) {
        Notify.create({
            message: 'Algo ocurrió mal',
            color: 'negative',
            icon: 'error'
        })
        return error
    }
}