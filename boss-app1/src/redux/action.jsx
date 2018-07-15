
import {
    reqLogin,
    reqRegist
} from '../api'


export const auth_succ = data => ({type: 'auth_succ', data})
export const register_err = data => ({type: 'register_err', data})


// 异步action creator(返回一个函数)                 
export const register = user => {

    const {username, password, password2, type} = user;
    // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
    if(!username) {
        return register_err('用户名必须指定!')
    } else if(password!==password2) {
        return register_err('2次密码要一致!')
    }

    return async dispatch => {
        const resp = await reqRegist(user);
        const result = resp.data;
        if(result.code==0){
            dispatch(auth_succ(result.data))
        }else{
            dispatch(register_err(result.msg))
        }
    }
}



// 异步action creator(返回一个函数)                 
export const login = user => {

    const {username, password} = user;
    // 做表单的前台检查, 如果不通过, 返回一个errorMsg的同步action
    if(!username) {
        return register_err('用户名必须指定!')
    } else if(!password) {
        return register_err('请填写密码!')
    }

    return async dispatch => {
        const resp = await reqLogin(user);
        const result = resp.data;
        if(result.code==0){
            dispatch(auth_succ(result.data))
        }else{
            dispatch(register_err(result.msg))
        }
    }
}



