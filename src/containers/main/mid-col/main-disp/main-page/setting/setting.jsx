import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Col,Row} from 'antd';
import SettingMenuDesktop from "./setting-menu/setting-menu-desktop";
import {Redirect, Route, Switch} from "react-router-dom";
import MyProfile from "./setting-pages/profile/profile-amend";
import MyPrivacy from "./setting-pages/privacy/privacy";
import MySecurity from "./setting-pages/security/my-security";
import {GetUserInfo} from '../../../../../../redux/actions'
class Settings extends Component {
    componentWillMount() {
        //console.log('now mounting profile-amend');
        this.props.GetUserInfo()
    }
    handleClick = e => {
        console.log('click ', e);
    };
    handleRedirect = target =>{
        this.props.history.push(target)
    }
    render() {
        return (
            <Col md={24}>
                <Col md={9}  xs={0} sm={0} >
                    <SettingMenuDesktop handleRedirect={this.handleRedirect}/>
                </Col>
                <Col md={{span:14,offset:1}}  xs={0} sm={0} >
                    <Switch>
                        <Route path='/main/settings/privacy' component={MyPrivacy}/>
                        <Route path='/main/settings/profile' component={MyProfile}/>
                        <Route path='/main/settings/security' component={MySecurity}/>
                        <Redirect to='/main/settings'/>
                    </Switch>
                </Col>
            </Col>
        );
    }
}


export default connect(
    state =>({user:state.user}),{GetUserInfo}
)(Settings)
