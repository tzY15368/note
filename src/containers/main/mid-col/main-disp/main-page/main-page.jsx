import React,{Component} from 'react'
import {Row, Col, Divider, Button, Icon} from "antd";
import HeaderMidMainDisp from "./header-mid-main-disp/header-mid-main-disp";
import MyEditor from "../../../../../components/editor";
import {Route, Switch, Redirect} from 'react-router-dom'
import FrontNotes from "./fronts/fronts";
import Alerts from "./alerts/alerts";
import MobileNav from "./nav-bar-mobile/nav";
import MySearch from "../../../right-col/search/search";
import './main-page.css'
import Settings from "./setting/setting";
import MyMenu from "../../../left-col/menu/menu";
import {Motion, spring} from "react-motion";
import MyTimeLine from "./timeline/timeline";
export default class MainPage extends Component {
    state = {
        sideMenuDisp:'none',
        open:false,
        location:'/main/front',
    };
    handleRedirect = (target) =>{
        this.setState({location:target});
        this.props.history.push(target)
    };
    toggleSideMenu = () =>{
        this.state.sideMenuDisp==='none'?this.setState({sideMenuDisp:'block',open:true}):this.setState({sideMenuDisp:'none',open:false});
    }
    ;
    render(){
        const {sideMenuDisp,location} = this.state;
        return (
            <Row>
                <Col md={24} sm={24} xs={24} style={{marginBottom:43,"zIndex":"2"}}>
                    <div className="panel">
                        <Col md={24} sm={24} xs={24} onClick={this.toggleSideMenu}>
                            <HeaderMidMainDisp location={location} />
                            <hr style={{margin:0}}/>
                        </Col>
                        <Switch>
                            <Route path='/main/front' component={FrontNotes}/>
                            <Route path='/main/alert' component={Alerts}/>
                            <Route path='/main/search' component={MySearch}/>
                            <Route path='/main/settings' component={Settings}/>
                            <Route path='/main/timeline' component={MyTimeLine}/>
                            <Redirect to='/main/front'/>
                        </Switch>
                    </div>
                </Col>
                    <Col md={0} lg={0} xl={0} sm={24} xs={24} style={{position:"fixed","zIndex":"2",overflow:"hidden",height:"100%",background:'rgba(0, 0, 0, .50)',display:sideMenuDisp}} className="side-menu">
                        <Motion style={{x: spring(this.state.open ? 41.67 : 100)}}>
                            {({x}) =>
                                // children is a callback which should accept the current value of
                                // `style`
                                <Col md={0} lg={0} xl={0} sm={14} xs={14} style={{position:"absolute",overflow:"hidden","zIndex":"3",height:"100%",background:'#ffffff',
                                    /*WebkitTransform: `translate3d(${x}px, 0, 0)`,
                                    transform: `translate3d(${x}px, 0, 0)`*/
                                    right:`${x}%`}}
                                >
                                    <Col sm={20} xs={20} style={{height:38}}>
                                        <strong style={{ fontSize: '20px'}}>&nbsp;&nbsp;&nbsp;&nbsp;账号信息</strong>
                                    </Col>
                                    <Col sm={4} xs={4} style={{height:38}}>
                                        <Button shape="circle" icon="close" onClick={this.toggleSideMenu}/>
                                    </Col>
                                    <Divider/>
                                    <MyMenu showHeader={'none'} handleRedirect = {this.handleRedirect} toggleMenu={this.toggleSideMenu}/>
                                </Col>
                            }
                        </Motion>

                        <Col md={0} lg={0} xl={0} sm={{span:10,offset:14}} xs={{span:10,offset:14}} onClick={this.toggleSideMenu} style={{position:"fixed",overflow:"hidden","zIndex":"1",height:"100%"}}>
                            {/*点击并收起区*/}
                        </Col>
                    </Col>
                    <Col xl={0} lg={0} md={0} sm={24} xs={24} >
                        <div className="navbar-fixed-bottom " style={{overflow:"hidden",transparent:0,background:"#E6E6FA"}} >
                            <MobileNav handleRedirect = {this.handleRedirect} toggleSideMenu = {this.toggleSideMenu} location={location}/>
                        </div>

                    </Col>
            </Row>

        )
    }
}