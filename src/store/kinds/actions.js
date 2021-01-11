
import { axiosInstance } from 'src/boot/axios'
import { Notify } from 'quasar'


export async function registerKind({ commit }, kind) {
    try {
        const { data } = await axiosInstance.post('/kind', kind)
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