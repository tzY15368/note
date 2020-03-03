import React,{Component} from 'react'
import {connect} from 'react-redux'
import {GetUserInfo} from '../../redux/actions'
import MainDisp from "./mid-col/main-disp/main-disp";
import MySearch from "./right-col/search/search";
import './main.css'
import LeftCol from "./left-col/left-col";
import cookie from "react-cookies";
import {Redirect} from "react-router-dom";
import {Col, Row} from "antd";
class Main extends Component {
    dojump = () =>{
        this.props.history.replace('/user/login')
    };
    componentWillMount = () =>{
        //console.log('now mounting main');
        this.props.GetUserInfo()
    };

    ToSettings = () =>{
        this.props.history.push('/main/settings')
    };
    handleRedirect = (target)=>{
        this.props.history.push(target)
    };
    render(){
        const token = cookie.load('token');
        if(token===undefined)
        {
            return(<Redirect push to="/user"/>)
        }
        return (
            <Row>
                <Col md={{span:3,offset:3}} sm={0} xs={0} style={{position:"fixed",overflow:"hidden","zIndex":"1"}}>
                    <div >
                        <LeftCol ToSettings={this.ToSettings} handleRedirect={this.handleRedirect}/>
                    </div>
                </Col>
                <Col md={{span:9,offset:6}} >
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