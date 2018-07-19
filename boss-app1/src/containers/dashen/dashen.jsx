/*
大神信息的路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getUserList} from '../../redux/action'
import UserList from '../../components/user-list/user-list'

class Dashen extends Component {

    componentDidMount () {
        this.props.getUserList('laoban')
    }

    render () {

        const {userList} = this.props

        return (
            <div className="">
                { userList.length ? <UserList userList={userList}/> : '' }
            </div>
        )
    }
}

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Dashen)