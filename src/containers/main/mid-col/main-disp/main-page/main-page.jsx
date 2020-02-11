import React,{Component} from 'react'
import HeaderMidMainDisp from "./header-mid-main-disp/header-mid-main-disp";
import MyEditor from "../../../../../components/editor";
import {Route, Switch, Redirect} from 'react-router-dom'
import FrontNotes from "./fronts/fronts";
import Alerts from "./alerts/alerts";
export default class MainPage extends Component {
    render(){
        return (
            <div className="panel">
                <HeaderMidMainDisp/>
                <div className="panel-body">
                    <MyEditor/>
                </div>
                <Switch>
                    <Route path='/main/front' component={FrontNotes}/>
                    <Route path='/main/alert' component={Alerts}/>
                    <Redirect to='/main/front'/>
                </Switch>
            </div>
        )
    }
}