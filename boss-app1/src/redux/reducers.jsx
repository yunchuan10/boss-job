

import {combineReducers} from 'redux'  // 合并多个reducer函数


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
            return {...state, ...action.data, redirectTo: '/'};
            break;
        case 'register_err':
            return {...state,msg: action.data};
            break;    
        default:    
            return state;
    }
}

export default combineReducers({
    user
})