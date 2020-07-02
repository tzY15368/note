import React,{Component} from 'react'
import { Modal, Button } from 'antd';
import {Redirect} from "react-router";
import cookie from 'react-cookies'
const { confirm } = Modal;
export default class LogOut extends Component {
    state = {
        redirect:false
    }
    showConfirm = ()=> {
        let that = this;
        confirm({
            title: '是否注销？',
            onOk() {
                that.setState({redirect:true});
                setTimeout(cookie.remove('token'), 300);
            },
            onCancel() {},
        });
    }
    render(){
        if(this.state.redirect===true){
            return (
                    <Redirect to={'/user'}/>
                )
        }
        return (
            <div style={{"marginTop":20}}>
                <Button block type={'danger'} size={"large"} icon={'logout'} onClick={this.showConfirm} style={{width:'75%',marginLeft:'10%',marginRight:'15%'}}>注销</Button>
            </div>
        )
    }
}