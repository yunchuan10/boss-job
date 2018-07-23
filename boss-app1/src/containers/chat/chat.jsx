/*
聊天信息的路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import QueueAnim from 'rc-queue-anim';

import {sendMsg} from '../../redux/action'

import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
const Item = List.Item


class Chat extends Component {

    state = {
        content: '',
        isShow: false
    }

    // 在第一次render()之前回调
    componentWillMount () {
        // 初始化表情列表数据
        const emojis = ['🙈', '😁', '🙉','🙊', '😁', '🙉','🙊', '😁', '🙉','🙊', '😁', '💥','🙊'
        ,'😁', '💥','💦', '😁', '💥','💦', '😁', '💥','💦', '😁', '💥'
        ,'😁', '💨','💦', '😁', '💨','💦', '😁', '💨','💫', '😁', '💨'
        ,'😁', '💨','💫', '😁', '🐒','💫', '😁', '🐒','💫', '😁', '🐒']
        this.emojis = emojis.map(emoji => ({text: emoji}))
    }

    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow) {
            // 异步手动派发resize事件,解决表情列表显示的bug
            setTimeout(() => {
              window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }

    sendMsg = () => {
        const to = this.props.match.params.userid
        const from = this.props.user._id
        const content = this.state.content.trim()
        if(content){
            this.props.sendMsg({from, to, content})
            this.setState({
                content: '',
                isShow: false
            })
        }

    }


    componentDidMount () {
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentDidUpdate () {
        window.scrollTo(0, document.body.scrollHeight)
    }

    render () {

        const {user} = this.props
        const {users, chatMsgs} = this.props.chat
        const meId = user._id
        if( !users[meId] ){
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId, targetId].sort().join('_')

        const msgs = chatMsgs.filter( msg => msg.chat_id===chatId )
        // 得到目标用户的header图片对象
        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

        return (
            <div id='chat-page' style={{ padding: '50px 0' }}>
                <NavBar 
                    onLeftClick={this.props.history.goBack}
                    icon={<Icon type='left'/>} 
                    className='sticky-header'
                    >
                    {users[targetId].username}
                </NavBar>
                <List>
                    <QueueAnim type='left' delay={1}>
                    {
                        msgs.map( msg => {
                            if(msg.to==meId){
                                return (
                                    <Item key={msg._id} thumb={targetIcon}>
                                        {msg.content}
                                    </Item>
                                )
                            }else{
                                return (
                                    <Item key={msg._id} className='chat-me' extra='我' >
                                        {msg.content}
                                    </Item>
                                )
                            }
                        })
                    }
                    </QueueAnim>
                    

                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        onKeyUp={
                            (e) =>  e.keyCode === 13 && this.sendMsg() 
                        }
                        placeholder="请输入"
                        value={this.state.content}
                        onChange={val => this.setState({content: val})}
                        onFocus={() => this.setState({isShow: false})}
                        extra={
                            <span>
                                <span onClick={ this.toggleShow } style={{marginRight: 5}}>😊</span>
                                <span onClick={this.sendMsg}>发送</span>
                            </span>
                        }
                    />

                    {this.state.isShow ? (
                        <Grid
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                this.setState({content: this.state.content + item.text})
                            }}
                        />
                    ) : null}

                </div>
            </div>
        )


    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg}
)(Chat)