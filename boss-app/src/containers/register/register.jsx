import React,{Component} from 'react'
import Logo from '../../components/logo/logo'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'

const Item = List.Item;

export default class Register extends Component {

    state = {
        username: '',
        password: '',
        password2: '',
        type: 'laoban'
    }
    
    toLogin = () => {
        console.log(this.props)
        this.props.history.replace({ pathname:'/login'})
    }

    handleChange( type, val ){
        console.log(type)
        this.setState({
            [type]: val
        })
    }

    // 注册
    register = () => {
        console.log(this.state)
    }
    


    render () {
        const {type} = this.state;
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
                        <InputItem type="password" onChange = { val => {this.handleChange('password2', val)} }>确认密码：</InputItem>
                        <WhiteSpace/>
                        <Item>
                            <span>用户类型：</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Radio onChange = { () => {this.handleChange('type', 'dashen')}} checked={type==='dashen'}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Radio onChange = { () => {this.handleChange('type', 'laoban')}} checked={type==='laoban'}>老板</Radio>
                        </Item>
                        <WhiteSpace/>
                        <Item>
                            <Button type="primary" onClick={this.register}>注册</Button>
                            <WhiteSpace/>
                            <Button onClick={this.toLogin}>已有账户</Button>
                        </Item>
                        
                    </List>
                </WingBlank>
            </div>
        )
    }
}












