
import io from 'socket.io-client'
import {
    reqLogin,
    reqRegist,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg
} from '../api'

// 接收一个消息的同步action
const receiveMsg = (chatMsg, userid) => ({type: 'recive_msg', data: {chatMsg, userid}})
function initIO(dispatch, userid) {
    // 1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
    if(!io.socket) {
        // 连接服务器, 得到与服务器的连接对象
        io.socket = io('ws://localhost:4000')  // 2. 创建对象之后: 保存对象
        // 绑定监听, 接收服务器发送的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('客户端接收服务器发送的消息', chatMsg)
            // 只有当chatMsg是与当前用户相关的消息, 才去分发同步action保存消息
            if(userid===chatMsg.from || userid===chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userid))
            }
        })
    }
}

// 接收消息列表的同步action
const receiveMsgList = ({users, chatMsgs}) => ({type: 'recive_msg_list', data:{users, chatMsgs}})
// 获取消息列表
async function getMsgList (dispatch, userid) {
    initIO(dispatch, userid)
    const response = await reqChatMsgList()
    const result = response.data
    if(result.code == 0){
        const {users, chatMsgs} = result.data
        dispatch(receiveMsgList({users, chatMsgs}))
    }
}



// 发送消息的异步action
export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        console.log('客户端向服务器发送消息', {from, to, content})
        io.socket.emit('sendMsg', {from, to, content})
    }
}



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
            getMsgList(dispatch, result.data._id)
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
            getMsgList(dispatch, result.data._id)
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
            getMsgList(dispatch, result.data._id)
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



