import React,{Component} from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import PrivacyAmend from "./privacy-amend";
export default class MyPrivacy extends Component {
    render(){
        return (
            <Switch>
                <Route path='/main/settings/privacy/p' component={PrivacyAmend}/>
                <Redirect to='/main/settings/privacy/p'/>
            </Switch>
        )
    }
}