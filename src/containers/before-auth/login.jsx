import React from 'react'
import cookie from 'react-cookies'
import {Button, Icon, Input,message} from "antd";
import BASEURL from "../../configs/names";
import axios from 'axios'
import {Redirect} from "react-router-dom";
export default class Login extends React.Component{
  state = {
    email:'',
    password:'',
    submitLoading: false,
    redirect:false,
    loginWarningDisp:'none',
  }
  error = (content) => {
    message.error(content);
  };
  handleChange = (e)=>{
  if (e.target.name==='password'){
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
    const {email,password} = this.state
    if(password&&email){
      this.setState({submitLoading:true})
      const url = BASEURL+'/access'
      console.log(url)
      axios.post(url, {
        email: email,
        password_hash:password
      })
          .then((res)=>{
            console.log(res.data.code)
            if(res.data.code===1002){
              cookie.save('token',res.data.data.access_token,{path:'/'})
              this.setState({
                redirect:true,
              })
            }
            else {
              this.setState({
                loginWarningDisp:'display'
              })
              setTimeout(()=>{this.setState({loginWarningDisp:'none'})},3000)
            }
            this.setState({submitLoading:false})

          })
          .catch((err)=>{
            console.log('err:'+err)
            this.setState({submitLoading:false})
            this.error('网络连接错误：'+err)
          })
    }
  }
  render() {
    if(this.state.redirect===true){
      return(
          <Redirect push to="/main"/>
      )
    }
    else {
      return(
          <div>
            <h2>登陆</h2>
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
                </div>
                <div className="form-group">
                  <Input.Password
                      name="password"
                      placeholder="input password"
                      onChange={this.handleChange}
                      allowClear
                  />
                </div>
                <span style={{display:this.state.loginWarningDisp}}><Icon type="warning" />该账户已存在</span>
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
      );
    }

  }
}