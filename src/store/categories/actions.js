
import { axiosInstance } from 'src/boot/axios'
import { Notify } from 'quasar'


export async function registerCategory({ commit }, category) {
    try {
        const { data } = await axiosInstance.post('/category', category)
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