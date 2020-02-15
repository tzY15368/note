import React,{Component} from 'react'
import {Row,Col} from "antd";
import HeaderMidMainDisp from "./header-mid-main-disp/header-mid-main-disp";
import MyEditor from "../../../../../components/editor";
import {Route, Switch, Redirect} from 'react-router-dom'
import FrontNotes from "./fronts/fronts";
import Alerts from "./alerts/alerts";
import MobileNav from "./nav-bar-mobile/nav";
import MySearch from "../../../right-col/search/search";
import './main-page.css'
export default class MainPage extends Component {
    handleRedirect = (target) =>{
        this.props.history.push(target)
    }
    render(){
        return (
            <Row>
                <Col md={24} sm={24} xs={24}>
                    <div className="panel">
                        <Col md={24} sm={0} xs={0}>
                            <HeaderMidMainDisp/>
                            <div className="panel-body">
                                <MyEditor/>
                            </div>

                        </Col>
                        <Col md={{span:22,offset:1}} sm={{span:22,offset:1}} xs={{span:22,offset:1}}>
                            <Switch>
                                <Route path='/main/front' component={FrontNotes}/>
                                <Route path='/main/alert' component={Alerts}/>
                                <Route path='/main/search' component={MySearch}/>
                                <Redirect to='/main/front'/>
                            </Switch>
                        </Col>

                    </div>
                </Col>
                <Col xl={0} lg={0} md={0} sm={24} xs={24} style={{overflow:"hidden",transparent:0}}>
                    <div className="navbar-fixed-bottom mobile-nav-bar" >
                        <MobileNav handleRedirect = {this.handleRedirect}/>
                    </div>

                </Col>
            </Row>

        )
    }
}