
import { axiosInstance } from 'src/boot/axios'
import { Notify } from 'quasar'


export async function createCategory({ commit }, category) {
    try {
        const { data } = await axiosInstance.post('/category', category)
        readCategories({commit})
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

export async function readCategories({ commit }) {
    try {
        const { data } = await axiosInstance.get('/category')
        commit('SET_CATEGORIES', data)
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


export async function showCategoriesbyKind({ commit }, relactions) {

        return axiosInstance.get('/kind/8?relations=["categories"]')

}