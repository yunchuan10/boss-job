import React,{Component} from 'react'
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

export default class Register extends Component {

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
        console.log(this.state)
    }
    
    render () {
        return (
            <div>
                <NavBar>Boss 直聘</NavBar>
                <Logo/>
                {/* 列表 */}
                <WingBlank>
                    <List>
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












