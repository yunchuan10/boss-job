import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'


class Main extends Component {
    render () {
        return (
            <div>
                <Switch>
                    <Route path='/laobaninfo' component={LaobanInfo} />
                    {/* <Route path='/dasheninfo' Component={DashenInfo} /> */}
                </Switch>
            </div>
        )
    }
}

// 向外暴露连接App组件的包装组件
export default connect(
    state => ({}),
    {}
)(Main)











