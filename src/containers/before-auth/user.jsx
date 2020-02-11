import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import MyNavLink from '../../components/my-nav-link'
import Login from './login'
import Register from './register'
import Header from "./header";
export default class User extends React.Component {
    render(){
        return (

            <div>
                <Header/>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/*导航路由链接*/}
                            <MyNavLink className="list-group-item" to='/user/login'>Login</MyNavLink>
                            <MyNavLink className="list-group-item" to='/user/reg'>Reg</MyNavLink>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                {/*可切换的路由组件*/}
                                <Switch>
                                    <Route path='/user/login' component={Login}/>
                                    <Route path='/user/reg' component={Register}/>
                                    <Redirect to='/user/login'/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}