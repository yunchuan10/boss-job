
/*
   底部组件
 */
import React, {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {TabBar} from 'antd-mobile'


// 希望在非路由组件中使用路由库的api?
// withRoute()
class NavFooter extends Component {

    state = {}

    render () {

        const {navList} = this.props
        const path = this.props.location.pathname

        console.log(path)
        return (
            <TabBar tabBarPosition='bottom'>
                {
                    navList.map(  
                        (nav) => (
                            <TabBar.Item title={nav.title} key={nav.title} icon={{ uri: require(`./images/${nav.icon}.png`) }}  selectedIcon={{ uri: require(`./images/${nav.icon}-selected.png`) }} selected={path===nav.path} ></TabBar.Item>
                        )
                    )
                }

            </TabBar>
        )
    }
}

// 向外暴露withRouter()包装产生的组件
// 内部会向组件中传入一些路由组件特有的属性: history/location/math
export default withRouter(NavFooter)



















{/* <TabBar
unselectedTintColor="#949494"
tintColor="#33A3F4"
barTintColor="white"
hidden={this.state.hidden}
>
<TabBar.Item
  title="Life"
  key="Life"
  icon={<div style={{
    width: '22px',
    height: '22px',
    background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
  />
  }
  selectedIcon={<div style={{
    width: '22px',
    height: '22px',
    background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
  />
  }
  selected={this.state.selectedTab === 'blueTab'}
  badge={1}
  onPress={() => {
    this.setState({
      selectedTab: 'blueTab',
    });
  }}
  data-seed="logId"
>
  {this.renderContent('Life')}
</TabBar.Item>

</TabBar> */}