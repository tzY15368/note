import React,{Component} from 'react'
import ProfileAmend from "./profile-amend";
import {Redirect, Route, Switch} from "react-router-dom";
export default class MyProfile extends Component {
    render(){
        return (
            <Switch>
                <Route path='/main/settings/profile/amend' component={ProfileAmend}/>
                <Redirect to='/main/settings/profile/amend'/>
            </Switch>
        )
    }
}