
import ajax from './ajax'

export const reqRegist = (user) => ajax( '/register', user, 'POST' )

export const reqLogin = (user) => ajax( '/login', user, 'POST' )

// 更新用户信息
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')



