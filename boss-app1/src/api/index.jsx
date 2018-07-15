
import ajax from './ajax'

export const reqRegist = (user) => ajax( '/register', user, 'POST' )

export const reqLogin = (user) => ajax( '/login', user, 'POST' )





