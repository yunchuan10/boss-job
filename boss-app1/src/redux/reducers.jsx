

import {combineReducers} from 'redux'  // 合并多个reducer函数
import {getRedirectTo} from '../util'


// 用户默认信息
const userInit = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''
}

function user(state = userInit, action) {
    switch(action.type){
        case 'auth_succ':
            state.msg = ''
            const {type, header} = action.data
            return {...state, ...action.data, redirectTo: getRedirectTo(type, header)};
            break;
        case 'register_err':
            return {...state,msg: action.data};
            break;
        case 'receive_user':
            return {...state, ...action.data};
            break;
        case 'reset_user':
            return {...state, msg: action.data};
            break;            
        default:    
            return state;
    }
}

export default combineReducers({
    user
})