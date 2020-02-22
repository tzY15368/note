import React,{Component} from 'react'
import {Row, Col, Input, Button, Icon, Divider} from "antd";
import {connect} from "react-redux";
import axios from 'axios'
import cookie from 'react-cookies'
import BASEURL from "../../../../../../../../configs/names";
import {ErrorMsg} from "../../../../../../../../components/notifications";
class ProfileAmend extends Component {
    constructor(props) {
        super(props);
        //console.log('!!!!!!!!!!!!!!!!!'+JSON.stringify(props))
        this.state = {
            userInfo:props.user,
            usernameInput:'',
            emailInput:'',
            mailLock:{
                locked:true,
                iconType:'lock'//lock,save,loading,check
            },
            usernameLock:{
                locked:true,
                iconType:'lock'
            }
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        //console.log('new props:------'+JSON.stringify(nextProps))
        this.setState({userInfo:nextProps.user})
    }
    handleSubmit = target =>{
        const url = BASEURL+'/user';
        let token = cookie.load('token');
        if(target==='mailLock'){
            this.setState({mailLock:{locked:!this.state.mailLock.locked,iconType:'loading'}});
            axios.put(url,{email:this.state.emailInput},{headers:{Authorization:token}
            }).then((res)=>{
                if(res.data.success===1){
                    this.setState({mailLock:{locked:this.state.mailLock.locked,iconType:'check'}});
                    setTimeout(()=>{this.setState({mailLock:{locked:this.state.mailLock.locked,iconType:'lock'}})},1000);
                } else {
                    ErrorMsg('更新失败'+res.data.data)
                }
            }).catch((error)=>{
                ErrorMsg('网络错误'+error)
            })/*
            setTimeout(()=>{this.setState({mailLock:{locked:this.state.mailLock.locked,iconType:'check'}})},2000);
            setTimeout(()=>{this.setState({mailLock:{locked:this.state.mailLock.locked,iconType:'lock'}})},4000);*/
        }
        else if(target==='usernameLock'){
            this.setState({usernameLock:{locked:!this.state.usernameLock.locked,iconType:'loading'}});
            axios.put(url,{username:this.state.usernameInput},{headers:{Authorization:token}
            }).then((res)=>{
                if(res.data.success===1){
                    this.setState({usernameLock:{locked:this.state.usernameLock.locked,iconType:'check'}})
                    setTimeout(()=>{this.setState({usernameLock:{locked:this.state.usernameLock.locked,iconType:'lock'}})},1000);
                } else {
                    ErrorMsg('更新失败'+res.data.data)
                }
            }).catch((error)=>{
                ErrorMsg('网络错误'+error)
            })/*
            setTimeout(()=>{this.setState({usernameLock:{locked:this.state.usernameLock.locked,iconType:'check'}})},2000);
            setTimeout(()=>{this.setState({usernameLock:{locked:this.state.usernameLock.locked,iconType:'lock'}})},4000);*/
        }
    };
    handleLock = (target)=>{
        if(target==='mailLock'){
            this.state.mailLock.locked===true?
                this.setState({mailLock:{locked:!this.state.mailLock.locked,iconType:'save'}}):
                this.handleSubmit('mailLock');
        }
        else if(target==='usernameLock'){
            this.state.usernameLock.locked===true?
                this.setState({usernameLock:{locked:!this.state.usernameLock.locked,iconType:'save'}}):
                this.handleSubmit('usernameLock');
        }
    };
    handleChange = (e)=>{
        if(e.target.name==='email'){
            this.setState({emailInput:e.target.value})
        } else if(e.target.name==='username'){
            this.setState({usernameInput:e.target.value})
        }
    }
    render(){
        console.log(JSON.stringify(this.props.user));
        const {mailLock,usernameLock,userInfo} = this.state;
        const emaillock = (
            <Button type="link" size="small" onClick={this.handleLock.bind(this,'mailLock')}><Icon type={mailLock.iconType}/></Button>
        );
        const usernamelock = (
            <Button type="link" size="small" onClick={this.handleLock.bind(this,'usernameLock')}><Icon type={usernameLock.iconType}/></Button>
        );
        return (
            <Col>
                <div className="form-group">
                    <Input addonAfter={emaillock} addonBefore={<Icon type="mail"/>} defaultValue={userInfo.email} onChange={this.handleChange} disabled={mailLock.locked} name="email"/>
                </div>
                <div className="form-group">
                    <Input addonAfter={usernamelock} addonBefore={<Icon type="user"/>} defaultValue={userInfo.username} onChange={this.handleChange} disabled={usernameLock.locked} name="username"/>
                </div>
                <Divider/>
            </Col>
        )
    }
}
export default connect(
    state =>({user:state.user}),{}
)(ProfileAmend)