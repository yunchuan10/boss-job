
import {
    reqLogin,
    reqRegist,
    reqUpdateUser,
    reqUser,
    reqUserList
} from '../api'


export const auth_succ = data => ({type: 'auth_succ', data})
export const register_err = data => ({type: 'register_err', data})
export const receiveUser = data => ({type: 'receive_user', data})
export const resetUser = data => ({type: 'reset_user', data})

// 接收用户列表的同步action
const receiveUserList = (data) => ({type: 'receive_user_list', data})

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

export const updateUser = user => {
    return async dispatch => {
        const response = await reqUpdateUser(user);
        const result = response.data
        if(result.code==0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
        
    }
}


// 实现自动登录               
export const getUser = user => {
    return async dispatch => {
        const resp = await reqUser(user);
        const result = resp.data;
        if(result.code==0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}


// 获取列表信息
export const getUserList = type => {
    return async dispatch => {
        const resp = await reqUserList(type);
        const result = resp.data;
        if(result.code==0){
            dispatch(receiveUserList(result.data))
        }
    }
}



