/* eslint-disable no-unused-vars */

export default async (to, from, next) => {

    const user = JSON.parse(localStorage.getItem('user'))

    if(user.role === '1'){
        next()

    }else{
        next('/')
    }


}