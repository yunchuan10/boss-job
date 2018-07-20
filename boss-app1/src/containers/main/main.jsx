import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Redirect} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import Chat from '../chat/chat'


import NavFooter from '../../components/nav-footer/nav-footer'

import NotFound from '../../components/not-found/not-found'


import Cookies from 'js-cookie'
import {getRedirectTo} from '../../util'
import {getUser} from '../../redux/action'
 

class Main extends Component {

    // 给组件对象添加属性
    navList = [ // 包含所有导航组件的相关信息数据
        {
            path: '/laoban', // 路由路径
            component: Laoban,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount(){
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if( userid && !_id ){   // cookie中有去 实现自动登录
            this.props.getUser()   //自动登录
        }
    }

    render () {
        const {user} = this.props;
        const userid = Cookies.get('userid')

        if(!userid){
            return <Redirect to='/login'/>
        }

        if(!user._id){ // 没有登录加载没有去登录页面
            return (<div>加载中。。。</div>)
        }else{  // 如果已经登录到对应用户类型的主页面
            let path = this.props.location.pathname;
            if(path === '/'){
                console.log(user.type)
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path}/>
            }
        }


        const {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav=> nav.path===path) || null // 得到当前的nav, 可能没有

        if(currentNav) {
            // 决定哪个路由需要隐藏
            if(user.type==='laoban') {
              // 隐藏数组的第2个
              navList[1].hide = true
            } else {
              // 隐藏数组的第1个
              navList[0].hide = true
            }
        }
        
        return (
            <div>
                { currentNav? (<NavBar className='sticky-header'> {currentNav.title} </NavBar>) : '' }

                
                    <Switch>
                        {
                            
                            navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
                        }
                        <Route path='/laobaninfo' component={LaobanInfo} />
                        <Route path='/dasheninfo' component={DashenInfo} />
                        <Route path='/chat/:userid' component={Chat} />
                        <Route component={NotFound}/>
                    </Switch>
                

                { currentNav? <NavFooter navList={navList} />  : '' }
                
            </div>
        )
    }
}

// 向外暴露连接App组件的包装组件
export default connect(
    state => ({user: state.user}),
    {getUser}
)(Main)











