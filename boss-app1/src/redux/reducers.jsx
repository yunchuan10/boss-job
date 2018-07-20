

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


function userList(state = [], action) {
    switch(action.type){
        case 'receive_user_list':
        console.log(action.data)
            return action.data;
            break;
        default:    
            return state;
    }
}


const initChat = {
    users: {}, // 所有用户信息的对象  属性名: userid, 属性值是: {username, header}
    chatMsgs: [], // 当前用户所有相关msg的数组
    unReadCount: 0 // 总的未读数量
}
function chat(state = initChat, action) {
    switch(action.type){
        case 'recive_msg_list':
            const {users, chatMsgs} = action.data
            return {users, chatMsgs}
            break;

        case 'recive_msg': // data: chatMsg
            const {chatMsg} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: 0
            }
        default:    
            return state;
    }
}

export default combineReducers({
    user,
    userList,
    chat
})