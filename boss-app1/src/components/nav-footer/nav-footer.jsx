
/*
   底部组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Redirect} from 'react-router-dom'
import {TabBar} from 'antd-mobile'

class NavFooter extends Component {

    state = {}

    render () {

        const {navList} = this.props



        return (
            <TabBar tabBarPosition='bottom'>
                {
                    navList.map(  
                        nav => (
                            <TabBar.Item title={nav.title} key={nav.title} icon={<img src={'./images/'+nav.icon+'.png'} />}  selectedIcon={<img src={'./images/'+nav.icon+'-selected.png'} />} ></TabBar.Item>
                        )
                    )
                }

            </TabBar>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(NavFooter)



















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