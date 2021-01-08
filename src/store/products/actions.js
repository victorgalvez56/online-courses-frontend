
import { axiosInstance } from 'src/boot/axios'
import { Notify } from 'quasar'


export async function registerProduct({ commit }, product) {

    try {
        const { data } = await axiosInstance.post('/item', product)
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
        return Promise.reject(error)
    }
}