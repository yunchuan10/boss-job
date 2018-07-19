import React,{Component}  from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import Item from '../../../node_modules/antd-mobile/lib/popover/Item';

export default class UserList extends Component{

    static propTypes={
        userList: PropTypes.array.isRequired
    }

    render () {
        let {userList} = this.props
        userList = userList.filter( user =>  {
            return (user.header&&user.salary)
        })

        console.log(userList)

        return (
            <WingBlank style={{marginBottom:60, marginTop:50}}>
                {
                    userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>

                                { 
                                    user.header?  
                                    <Card.Header
                                        thumb={require(`../../assets/images/${user.header}.png`)} 
                                        extra={user.username}
                                    /> : 
                                    <Card.Header extra={user.username} />
                                }
                                
                                <Card.Body>
                                    <div>职位: {user.post}</div>
                                    {user.company ? <div>公司: {user.company}</div> : null}
                                    {user.salary ? <div>月薪: {user.salary}</div> : null}
                                    <div>描述: {user.info}</div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>
        )

    }

}



