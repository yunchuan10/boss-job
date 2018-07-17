
/*
老板信息完善的路由容器组件
 */
import React, {Component} from 'react'
import { Grid, List } from 'antd-mobile'

export default class HeadSelect extends Component {

    state = {
        icon: null
    }

    setIcon = ({text, icon}) => {
        this.setState({icon})
        this.props.setHeader(text)
    }

    constructor(props) {
        super(props)
        // 准备需要显示的列表数据
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: '头像'+(i+1),
                icon: require(`../../assets/images/头像${i+1}.png`) // 不能使用import
            })
        }
    }

  
    render () {

        const {icon} = this.state;
        let renderHeader = '请选择头像'
        if(icon){
            renderHeader = (
                <div>
                    已选择头像： <img src={icon}/>
                </div>
            )
        }

        return (
            <div>
                <List renderHeader={() => renderHeader}>
                    <Grid data={this.headerList} columnNum={5} onClick={this.setIcon}/>
                </List>
            </div>
        )
    }
}















