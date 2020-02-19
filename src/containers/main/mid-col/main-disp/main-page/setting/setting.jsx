import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Col,Row} from 'antd';
import SettingMenuDesktop from "./setting-menu/setting-menu-desktop";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "../../../../../before-auth/login";
import Register from "../../../../../before-auth/register";
import MyProfile from "./setting-pages/profile/profile";
import MyPrivacy from "./setting-pages/privacy/privacy";
import MySecurity from "./setting-pages/security/security";

class Settings extends Component {
    componentDidMount() {
        console.log(this.props.user)
    }
    handleClick = e => {
        console.log('click ', e);
    };
    render() {
        return (
            <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                <Row>
                    <Col xs={0} sm={0} md={9} lg={9} xl={9}>
                        <SettingMenuDesktop/>
                    </Col>
                    <Col xs={0} sm={0} md={{span:15,offset:9}} lg={{span:15,offset:9}} xl={{span:15,offset:9}}>
                        <Switch>
                            <Route path='/main/settings/privacy' component={MyPrivacy}/>
                            <Route path='/main/settings/profile' component={MyProfile}/>
                            <Route path='/main/settings/security' component={MySecurity}/>
                            <Redirect to='/main/settings'/>
                        </Switch>
                    </Col>
                </Row>

            </Col>


        );
    }
}


export default connect(
    state =>({user:state.user}),{}
)(Settings)
