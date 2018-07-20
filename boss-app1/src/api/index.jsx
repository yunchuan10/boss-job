
import ajax from './ajax'

export const reqRegist = (user) => ajax( '/register', user, 'POST' )

export const reqLogin = (user) => ajax( '/login', user, 'POST' )

// 更新用户信息
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')

export const reqUser = (user) => ajax('/user', user, 'GET')

export const reqUserList = (type) => ajax('/userlist', {type})

// 获取当前用户的聊天消息列表
export const reqChatMsgList = () => ajax('/msglist')

// 修改指定消息为已读
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST')

