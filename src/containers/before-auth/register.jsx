import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Input, Button, Icon, Alert} from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import axios from 'axios'
import BASEURL from '../../configs/names'
import {ErrorMsg, SuccessMsg} from "../../components/notifications";
import {ValidateEmail,ValidatePassword,ValidateUsername} from "../../utils/validator";
import {encrypt} from "../../utils/encrypts";
export default class Register extends React.Component{
    state = {
        username:'',
        password:'',
        email:'',
        passwordRequired:'none',
        emailRequired:'none',
        usernameRequired:'none',
        passwordAlert:'none',
        usernameAlert:'none',
        emailAlert: 'none',
        duplicateAlert:'none',
        submitLoading:false,
        duplicateWarningDisp:'none',
        redirect:false,
    }
    handleChange = (e) =>{
        if(e.target.name==='username'){
            const username = e.target.value
            this.setState({
                username:username
            })
        }
        else if (e.target.name==='password'){
            const content = e.target.value
            this.setState({
                password:content
            })
        }
        else if(e.target.name==='email') {
            const email = e.target.value
            this.setState({
                email:email
            })
        }
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        const {username,password,email} = this.state;
        if(username&&password&&email){
            let [us,pa,em] = [ValidateUsername(username),ValidatePassword(password),ValidateEmail(email)];
            if(us&&pa&&em){
                this.setState({submitLoading:true});
                const url = BASEURL+'/user';
                axios.post(url, {
                    username: username,
                    password_hash: encrypt(password),
                    email: email
                })
                    .then((res)=>{
                        console.log(res.data.code)
                        if(res.data.code===1001){
                            //注册成功，去登陆
                            this.setState({submitLoading:false})
                            SuccessMsg('Registration success, redirecting...')
                            setTimeout(()=>{this.setState({redirect:true})},2000)
                        } else {
                            if(res.data.code===3){
                                this.setState({duplicateAlert:'block'})
                            }
                            else {
                                ErrorMsg('this shouldn\'t happen')
                            }
                        }
                        this.setState({submitLoading:false})
                    })
                    .catch((err)=>{
                        this.setState({submitLoading:false});
                        ErrorMsg('网络错误：'+err)
                    })
            } else {
                if(!em){this.setState({emailAlert:'block'})}
                if(!pa){this.setState({passwordAlert:'block'})}
                if(!us){this.setState({usernameAlert:'block'})}
            }

        }  else {
            if(password===''){this.setState({passwordRequired:'block'})}
            if(email===''){this.setState({emailRequired:'block'})}
            if(username===''){this.setState({usernameRequired:'block'})}
        }
    }
    render() {
        if(this.state.redirect===true){
            return(
                <Redirect push to="/user/login"/>
            )
        } else {
            const {emailAlert,usernameAlert,passwordAlert,passwordRequired,emailRequired,usernameRequired,duplicateAlert} = this.state
            return (
                <div>
                    <h2>注册</h2>
                    <div className="col-xs-6">
                        <form className="form-horizontal">
                            <div className="form-group">
                                <Input
                                    prefix={<Icon type="mail"/>}
                                    placeholder="Enter your email"
                                    name="email"
                                    onChange={this.handleChange}
                                    allowClear
                                />
                                <Alert
                                    message="Email required"
                                    type="warning"
                                    closable
                                    showIcon
                                    style={{marginTop:"10px",display:emailRequired}}
                                />
                                <Alert
                                    message="Invalid Email"
                                    type="error"
                                    showIcon
                                    closable
                                    style={{marginTop:"10px",display:emailAlert}}
                                />
                                <Alert
                                    message="Duplicate Email"
                                    type="error"
                                    showIcon
                                    closable
                                    style={{marginTop:"10px",display:duplicateAlert}}
                                />

                            </div>
                            <div className="form-group">
                                <Input
                                    allowClear
                                    required
                                    name="username"
                                    placeholder="Enter your username"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    onChange={this.handleChange}
                                />
                                <Alert
                                    message="Username required"
                                    type="warning"
                                    closable
                                    showIcon
                                    style={{marginTop:"10px",display:usernameRequired}}
                                />
                                <Alert
                                    message="Invalid username"
                                    type="error"
                                    showIcon
                                    closable
                                    style={{marginTop:"10px",display:usernameAlert}}
                                />
                            </div>
                            <div className="form-group">
                                <Input.Password
                                    name="password"
                                    placeholder="input password"
                                    onChange={this.handleChange}
                                    allowClear
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />
                                <Alert
                                    message="Password required"
                                    type="warning"
                                    closable
                                    showIcon
                                    style={{marginTop:"10px",display:passwordRequired}}
                                />
                                <Alert
                                    message="Invalid password"
                                    type="error"
                                    showIcon
                                    closable
                                    style={{marginTop:"10px",display:passwordAlert}}
                                />
                            </div>
                            <div className="form-group">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon="check"
                                    onClick={this.handleSubmit}
                                    loading={this.state.submitLoading}
                                >Submit</Button>
                            </div>
                        </form>


                    </div>
                </div>

            )
        }

    }


}