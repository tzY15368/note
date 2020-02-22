import React,{Component} from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import PasswordChange from "./security-psw-change";
import AccountRm from "./security-rm";
import AccountHistory from "./security-history";
import AccountKeys from "./security-keys";
import LogOut from "./security-logout";
export default class MySecurity extends Component {
    render(){
        return (
            <Switch>
                <Route path='/main/settings/security/pass' component={PasswordChange}/>
                <Route path='/main/settings/security/rm' component={AccountRm}/>
                <Route path='/main/settings/security/history' component={AccountHistory}/>
                <Route path='/main/settings/security/keys' component={AccountKeys}/>
                <Route path='/main/settings/security/logout' component={LogOut}/>
            </Switch>
        )
    }
}