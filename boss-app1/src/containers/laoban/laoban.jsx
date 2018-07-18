/*
老板信息的路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Redirect} from 'react-router-dom'
// import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {updateUser} from '../../redux/action'

class Laoban extends Component {

    state = {
        
    }

    render () {
       

        return (
            <div>
                老板信息
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(Laoban)