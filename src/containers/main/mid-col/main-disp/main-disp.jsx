import React,{Component} from 'react'
import Settings from "./setting/setting";
import {Redirect, Route, Switch} from "react-router-dom";
import MainPage from "./main-page/main-page";
export default class MainDisp extends Component {
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/main' component={MainPage}/>
                    <Route path='/settings' component={Settings}/>
                    <Redirect to='/main'/>
                </Switch>
            </div>
        )
    }
}