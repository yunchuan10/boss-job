/*
老板信息的路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

class Message extends Component {

    findLasts = (arr, userid) =>{

        

        let obj = {}
        arr.forEach(msg => {

            // 对msg进行个体的统计
            if(msg.to===userid && !msg.read) {
                msg.unReadCount = 1
            } else {
                msg.unReadCount = 0
            }

            // 得到msg的聊天标识id
            const chatId = msg.chat_id
            // 获取已保存的当前组件的lastMsg
            let lastMsg = obj[chatId]

            if(!lastMsg){
                obj[chatId] = msg
            }else{
                const unReadCount = lastMsg.unReadCount + msg.unReadCount
                if(msg.create_time>lastMsg.create_time) {
                    obj[chatId] = msg
                }
                obj[chatId].unReadCount = unReadCount

            }

            
        });

        let lastMsgs = Object.values(obj)
        // 3. 对数组进行排序(按create_time降序)
        lastMsgs.sort(function (m1, m2) { // 如果结果<0, 将m1放在前面, 如果结果为0, 不变, 如果结果>0, m2前面
            return m2.create_time-m1.create_time
        })
        return lastMsgs

    }
    

    render () {

        const {user} = this.props
        const {users, chatMsgs} = this.props.chat
        console.log(chatMsgs)
        const lastMsgs = this.findLasts( chatMsgs, user._id )
        console.log(lastMsgs)

        return (
            <List style={{marginTop:50, marginBottom: 50}}>
                {
                    lastMsgs.map(msg =>{
                        // 得到目标用户的id
                        const targetUserId = msg.to===user._id ? msg.from : msg.to
                        // 得到目标用户的信息
                        const targetUser = users[targetUserId]
                        return (
                        <Item
                            key={msg._id}
                            extra={<Badge text={msg.unReadCount}/>}
                            thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                            arrow='horizontal'
                            onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                        >
                            {msg.content}
                            <Brief>{targetUser.username}</Brief>
                        </Item>
                        )
                    })
                }
            </List>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)