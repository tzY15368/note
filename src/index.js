import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter , HashRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import './index.css'



import MobileMain from "./mobile/main/main";
import store from "./redux/store";
import Main from './containers/main/main'
import User from './containers/before-auth/user'
console.log(navigator.userAgent)
let UA = 'PC'
if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    UA = 'PHONE'
}
console.log('ua:'+UA)
if(UA==='PC'){
    ReactDom.render((
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route path='/user' component={User}/>

                    <Route component={Main}/>
                </Switch>
            </HashRouter>
        </Provider>
    ),document.getElementById('root'))
} else {ReactDom.render((
    <MobileMain/>
),document.getElementById('root-mobile'))

}
