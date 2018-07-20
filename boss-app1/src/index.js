import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './redux/store'
import Main from './containers/main/main'
import Register from './containers/register/register'
import Login from './containers/login/login'

import './assets/css/index.less'

import {BrowserRouter, HashRouter, Route, Switch, Redirect} from 'react-router-dom'

// import '../src/test/sockitio_test'

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route component={Main}/>
                <Redirect to='/'/>
            </Switch>
        </BrowserRouter>    
    </Provider>
), document.getElementById('root'));
