import React,{Component} from 'react'
import {connect} from 'react-redux' 
import {login} from '../../redux/action'   
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'

const Item = List.Item;

class Login extends Component {

    state = {
        username: '',
        password: '',
    }
    
    toRegister = () => {
        console.log(this.props)
        this.props.history.replace({ pathname:'/register'})
    }

    handleChange( type, val ){
        this.setState({
            [type]: val
        })
    }

    // 登录
    login = () => {
        this.props.login(this.state)
    }
    
    render () {

        const vv = this.props.user
        console.log(vv)

        const {msg, redirectTo} = this.props.user;
        if(redirectTo){
            return ( <Redirect to={redirectTo}/> )
        }

        return (
            <div>
                <NavBar>Boss 直聘</NavBar>
                <Logo/>
                {/* 列表 */}
                <WingBlank>
                    <List>
                        { msg? <div style={{color:'red'}}>{msg}</div> : ''}
                        <InputItem type="text" placeholder="输入用户名" onChange = { val => {this.handleChange('username', val)} }>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange = { val => {this.handleChange('password', val)} }>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <Item>
                            <Button type="primary" onClick={this.login}>登录</Button>
                            <WhiteSpace/>
                            <Button onClick={this.toRegister}>还没有账户</Button>
                        </Item>
                    </List>
                </WingBlank>
            </div>
        )
    }
}


// 向外暴露连接App组件的包装组件
export default connect(
    state => ({user: state.user}),
    {login}
)(Login)









