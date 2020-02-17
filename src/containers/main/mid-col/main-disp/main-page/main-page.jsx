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
import Settings from "../setting/setting";
import MyMenu from "../../../left-col/menu/menu";
export default class MainPage extends Component {
    state = {
        sideMenuDisp:'none',
        sideMenuPos:'100%'//100%是完全收起，41.6%是完全放出
    };
    handleRedirect = (target) =>{
        this.props.history.push(target)
    };
    handleSideMenuMovement = () =>{
        //动画耗时960ms
        console.log('starting animation:'+this.state.sideMenuPos);
        if(this.state.sideMenuPos==='100%'){
            let stat = 100;
            const step = -0.9721;
            for(let i=0;i<60;i++){
                stat = stat+step;
                let pos = stat+'%';
                console.log('pos:'+pos);
                setTimeout(()=>{this.setState({sideMenuPos:pos})},160)
                console.log('finish:'+this.state.sideMenuPos);
            }

        }
        else {
            let pos = this.state.sideMenuPos.split('%')
            let stat = parseInt(pos[0]);
            const step = (100-stat)/60;
            for(let i=0;i<60;i++){
                stat = stat+step;
                if(stat>=100){
                    stat = 100;
                }
                let pos = stat+'%';
                console.log('pos:'+pos);
                setTimeout(()=>{this.setState({sideMenuPos:pos})},160)

            }
        }
    }
    toggleSideMenu = () =>{
        this.state.sideMenuDisp==='none'?this.setState({sideMenuDisp:'block'}):this.setState({sideMenuDisp:'none'});
    }
    ;
    render(){
        const {sideMenuDisp,sideMenuPos} = this.state;
        return (
            <Row>
                <Col md={24} sm={24} xs={24} style={{marginBottom:43}}>
                    <div className="panel">
                        <Switch>
                            <Route path='/main/front' component={FrontNotes}/>
                            <Route path='/main/alert' component={Alerts}/>
                            <Route path='/main/search' component={MySearch}/>
                            <Route path='/main/settings' component={Settings}/>
                            <Redirect to='/main/front'/>
                        </Switch>
                    </div>
                </Col>
                <Col md={0} lg={0} xl={0} sm={24} xs={24} style={{position:"fixed",overflow:"hidden","zIndex":"1",height:"100%",background:'rgba(0, 0, 0, .50)',display:sideMenuDisp}} className="side-menu">
                    <Col md={0} lg={0} xl={0} sm={14} xs={14} style={{position:"absolute",right:"41.67%",overflow:"hidden","zIndex":"2",height:"100%",background:'#ffffff'}}>
                        <Col sm={20} xs={20} style={{height:38}}>
                            <strong style={{ fontSize: '20px'}}>&nbsp;&nbsp;&nbsp;&nbsp;账号信息</strong>
                        </Col>
                        <Col sm={4} xs={4} style={{height:38}}>
                            <Button shape="circle" icon="close" onClick={this.toggleSideMenu}/>
                        </Col>
                        <Divider />
                        <MyMenu showHeader={'none'}/>
                    </Col>
                    <Col md={0} lg={0} xl={0} sm={{span:10,offset:14}} xs={{span:10,offset:14}} onClick={this.toggleSideMenu} style={{position:"fixed",overflow:"hidden","zIndex":"3",height:"100%"}}>
                        {/*点击并收起区*/}
                    </Col>
                </Col>
                <Col xl={0} lg={0} md={0} sm={24} xs={24} >
                    <div className="navbar-fixed-bottom " style={{overflow:"hidden",transparent:0,background:"#E6E6FA"}} >
                        <MobileNav handleRedirect = {this.handleRedirect} toggleSideMenu = {this.toggleSideMenu}/>
                    </div>

                </Col>
            </Row>

        )
    }
}