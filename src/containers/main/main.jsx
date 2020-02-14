import React,{Component} from 'react'
import {connect} from 'react-redux'
import {GetUserInfo} from '../../redux/actions'
import MainDisp from "./mid-col/main-disp/main-disp";
import MySearch from "./right-col/search/search";
import './main.css'
import LeftCol from "./left-col/left-col";
import cookie from "react-cookies";
import {Redirect} from "react-router-dom";
import {Col, Layout, Row} from "antd";
const { Header, Content, Footer, Sider } = Layout;
class Main extends Component {
    dojump = () =>{
        this.props.history.replace('/user/login')
    }
    componentWillMount = () =>{
        console.log('now mounting main');
        this.props.GetUserInfo()
    };

    ToSettings = () =>{
        this.props.history.push('/settings')
    };
    render(){
        const token = cookie.load('token');
        if(token===undefined)
        {
            return(<Redirect push to="/user"/>)
        }
        return (
            /*<div className="">
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2 left" >
                        <LeftCol ToSettings={this.ToSettings}/>
                    </div>
                    <div className="col-xs-4 mid">
                        <MainDisp/>
                    </div>
                    <div className="col-xs-2 right">
                        <MySearch/>
                    </div>
                </div>
            </div>*/
            /*<Layout>
                <Sider>
                    <LeftCol ToSettings={this.ToSettings}/>
                </Sider>
                <Layout>
                    <Row>
                        <Col md={10} sm={20} xs={20} className="mid">
                            <MainDisp/>
                        </Col>
                        <Col md={{span:5}} sm={0} xs={0} className="right">
                            <MySearch/>
                        </Col>
                    </Row>
                    </Row>
                </Layout>
            </Layout>*/
            <Row>
                <Col md={{span:3,offset:3}} sm={0} xs={0} >
                    <div >
                        <LeftCol ToSettings={this.ToSettings}/>
                    </div>

                </Col>
                <Col md={9} >
                    <MainDisp/>
                </Col>
                <Col md={{span:6}} sm={0} xs={0} className="right">
                    <MySearch/>
                </Col>
            </Row>
        )
    }
}
export default connect(
    state=>({}),{GetUserInfo}
)(Main)