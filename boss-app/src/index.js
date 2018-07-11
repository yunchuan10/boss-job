import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './redux/store'
import Main from './containers/main/main'
import Register from './containers/register/register'
import Login from './containers/login/login'

import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom'



ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route component={Main}/>
            </Switch>
        </BrowserRouter>    
    </Provider>
), document.getElementById('root'));
