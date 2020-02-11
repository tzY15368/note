import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { Input, Button, Icon } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import axios from 'axios'
import BASEURL from '../../configs/names'
import {ErrorMsg} from "../../components/notifications";
export default class Register extends React.Component{
    state = {
        username:'',
        password:'',
        email:'',
        submitLoading:false,
        duplicateWarningDisp:'none',
        redirect:false
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
        e.preventDefault()
        console.log(this.state)
        const {username,password,email} = this.state
        if(username&&password&&email){
            this.setState({submitLoading:true})
            const url = BASEURL+'/user'
            console.log(url)
            axios.post(url, {
                username: username,
                password_hash: password,
                email: email
            })
                .then((res)=>{
                    console.log(res.data.code)
                    if(res.data.code===1001){
                        //注册成功，去登陆
                        this.setState({redirect:true})
                    } else {
                        if(res.data.code===3){
                            this.setState({
                                duplicateWarningDisp:'block'
                            })
                            setTimeout(()=>{this.setState({duplicateWarningDisp:'none'})},3000)
                            console.log(this.state.duplicateWarningDisp)
                        }
                    }
                    this.setState({submitLoading:false})
            })
                .catch((err)=>{
                    console.log('err:'+err)
                    this.setState({submitLoading:false})
                    ErrorMsg('网络错误：'+err)
                })
        }
    }
    render() {
        if(this.state.redirect===true){
            return(
                <Redirect push to="/user/login"/>
            )
        }
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
                            <span style={{display:this.state.duplicateWarningDisp}}><Icon type="warning" />该账户已存在</span>

                        </div>
                        <div className="form-group">
                            <Input
                                allowClear
                                required
                                name="username"
                                placeholder="Enter your username"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                                }
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <Input.Password
                                name="password"
                                placeholder="input password"
                                onChange={this.handleChange}
                                allowClear
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

                    {/*<ul className="nav nav-tabs">
          <li>
            <MyNavLink to='/home/news'>News</MyNavLink>
          </li>
          <li>
            <MyNavLink to="/home/message">Message</MyNavLink>
          </li>
        </ul>
        <Switch>
          <Route path='/home/news' component={News} />
          <Route path='/home/message' component={Message} />
          <Redirect to='/home/news'/>
        </Switch>*/}

                </div>
            </div>

        )
    }


}