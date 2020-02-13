import React,{Component} from 'react'
import {connect} from 'react-redux'
import {GetUserInfo} from '../../redux/actions'
import MainDisp from "./mid-col/main-disp/main-disp";
import MySearch from "./right-col/search/search";
import './main.css'
import LeftCol from "./left-col/left-col";
import cookie from "react-cookies";
import {Redirect} from "react-router-dom";
class Main extends Component {
    dojump = () =>{
        this.props.history.replace('/user/login')
    }
    componentWillMount = () =>{
        console.log('now mounting main')
        this.props.GetUserInfo()
    }

    ToSettings = () =>{
        this.props.history.push('/settings')
    }
    render(){
        const token = cookie.load('token')
        if(token===undefined)
        {
            return(<Redirect push to="/user"/>)
        }
        return (
            <div className="">
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
            </div>
        )
    }
}
export default connect(
    state=>({}),{GetUserInfo}
)(Main)