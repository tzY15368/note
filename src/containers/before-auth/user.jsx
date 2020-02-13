import React from 'react'
import { Row, Col ,Menu,Icon} from 'antd';

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
                {/*<div className="row">
                <div className="col-xs-2 col-xs-offset-2">
                    <div className="list-group">
                        <MyNavLink className="list-group-item" to='/user/login'>Login</MyNavLink>
                        <MyNavLink className="list-group-item" to='/user/reg'>Reg</MyNavLink>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="panel">
                        <div className="panel-body">
                            <Switch>
                                <Route path='/user/login' component={Login}/>
                                <Route path='/user/reg' component={Register}/>
                                <Redirect to='/user/login'/>
                            </Switch>
                        </div>
                    </div>
                </div>
                </div>*/}
                <Row>
                    <Col md={{span:3,offset:4}} sm={{span:16,offset:4}} xs={{span:16,offset:4}}>
                        <div className="list-group">
                            <Col md={{span:24}} sm={{span:12}} xs={{span:12}}>
                                <MyNavLink className="list-group-item" to='/user/login'>Log</MyNavLink>
                            </Col>
                            <Col md={{span:24}} sm={{span:12}} xs={{span:12}}>
                                <MyNavLink className="list-group-item" to='/user/reg'>Reg</MyNavLink>
                            </Col>

                        </div>
                    </Col>
                    <Col md={{span:16,offset:1}} sm={{span:16,offset:4}} xs={{span:16,offset:4}}>
                        <div className="panel">
                            <div className="panel-body">
                                <Col md={{span:10,offset:2}} sm={{span:24}} xs={{span:24}}>
                                    <Switch>
                                        <Route path='/user/login' component={Login}/>
                                        <Route path='/user/reg' component={Register}/>
                                        <Redirect to='/user/login'/>
                                    </Switch>
                                </Col>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}