
import { axiosInstance } from 'src/boot/axios'
import { Notify } from 'quasar'


export async function createKind({ commit }, kind) {
    try {
        const { data } = await axiosInstance.post('/kind', kind)
        readKinds({commit})
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
export async function readKinds({ commit }) {
    try {
        const { data } = await axiosInstance.get('/kind')
        commit('SET_KINDS', data)
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
export async function setPictureKind({ commit }, data) {
  
    console.warn(data)
    return axiosInstance.put('/kind/media/'+data[0], data[1])
}

export async function getKind({ commit }, data) {
  
    
    return axiosInstance.get('/kind/'+data)
}

export async function getPictureKind({ commit }, data) {
  
    
    return axiosInstance.get('/kind/media'+data)
}