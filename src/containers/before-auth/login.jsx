import React from 'react'
import cookie from 'react-cookies'
import {Button, Icon, Input, message, Alert, Avatar, Tooltip, Modal} from "antd";
import BASEURL from "../../configs/names";
import axios from 'axios'
import {Redirect} from "react-router-dom";
import {ErrorMsg} from "../../components/notifications"
import {ValidateEmail} from "../../utils/validator";
import {encrypt} from "../../utils/encrypts";
import LoginFrom from "./login-from";
import js_date_time from "../../utils/datetime";
export default class Login extends React.Component{
  state = {
    email:'',
    password:'',
    emailAlert:'none',
    loginAlert:'none',
    passwordRequired:'none',
    emailRequired:'none',
    submitLoading: false,
    redirect:false,
    loginWarningDisp:'none',
    loginAlertMsg:'',
    modalLoading: false,
    modalVisible: false,
    avatarSrc:'',
    tokenExists:false,
    currentUserInfo:{}
  };
  componentDidMount =()=> {
    let token = cookie.load('token');
    const url = BASEURL+'/user';
    if(token!==undefined){
      this.setState({tokenExists:true});
      axios.get(url, {
        headers:{Authorization:token}
      }).then((res)=>{
        if(res.data.code===1001){
          this.setState({currentUserInfo:res.data.data,tokenExists:true})
        } else {
          this.setState({tokenExists:false})
        }
      }).catch((err)=>{
        ErrorMsg('网络错误');
        this.setState({tokenExists:false})
      })
    }
  };
  error = (content) => {
    message.error(content);
  };
  handleClearLogin = ()=>{
    cookie.remove('token');
  };
  handleChange = (e)=>{
  if (e.target.name==='password'){
      const content = e.target.value;
      this.setState({
        password:content
      })
    }
    else if(e.target.name==='email') {
      const email = e.target.value;
      this.setState({
        email:email
      })
    }
  };
  handleSubmit = (e) =>{
    e.preventDefault();
    const {email,password,tokenExists} = this.state;
    if(tokenExists){
      this.setState({redirect:true,})
    }
    if(password&&email){
      if(ValidateEmail(email)){
        this.setState({submitLoading:true});
        const url = BASEURL+'/access';
        //console.log(url);
        axios.post(url, {
          email: email,
          password_hash:encrypt(password)
        })
            .then((res)=>{
              //console.log(res.data)
              if(res.data.code===1002){
                cookie.save('token',res.data.data.access_token,{path:'/'});
                this.setState({
                  redirect:true,
                })
              }
              else {
                this.setState({
                  loginAlert:'block',
                  loginAlertMsg:res.data.data
                })
              }
              this.setState({submitLoading:false})

            })
            .catch((err)=>{
              this.setState({submitLoading:false});
              ErrorMsg('网络连接错误：'+err)
            })
      } else {this.setState({emailAlert:'block'})}

    } else {
      if(password===''){this.setState({passwordRequired:'block'})}
      if(email===''){this.setState({emailRequired:'block'})}
    }
  };
  handleModalOk = () => {
    this.setState({ modalLoading: true });
    setTimeout(() => {
      this.setState({ modalLoading: false, modalVisible: false });
    }, 3000);
  };
  handleModalCancel = () => {
    this.setState({ modalVisible: false });
  };
  loginWith = (target)=>{
    console.log(target)
    this.setState({
      modalVisible:true
    })
  }
  ToggleTokenExist = ()=>{
    this.setState({tokenExists:!this.state.tokenExists});
  };
  render() {
    if(this.state.redirect===true){
      return(
          <Redirect push to="/main"/>
      )
    }

    else {
      const {emailAlert,loginAlert,passwordRequired,emailRequired,loginAlertMsg,modalVisible,modalLoading} = this.state;
      return(
          <div>
            <Modal
                visible={modalVisible}
                title="Title"
                onOk={this.handleModalOk}
                onCancel={this.handleModalCancel}
                footer={[
                  <Button key="back" onClick={this.handleModalCancel}>
                    Return
                  </Button>,
                  <Button key="submit" type="primary" loading={modalLoading} onClick={this.handleModalOk}>
                    Submit
                  </Button>,
                ]}
            >
              <LoginFrom>

              </LoginFrom>
            </Modal>
              <form className="form-horizontal">
                <div className="form-group" style={this.state.tokenExists===false?{display:'block'}:{display:'none'}}>
                  <Input
                      prefix={<Icon type="mail"/>}
                      placeholder="Enter your email"
                      name="email"
                      onChange={this.handleChange}
                      allowClear
                      onBlur={this.handleBlur}
                  />
                  <Alert
                      message="Invalid Email"
                      type="error"
                      showIcon
                      /*closable*/
                      style={{marginTop:"10px",display:emailAlert}}/>
                  <Alert
                      message="Email required"
                      type="warning"
                      /*closable*/
                      /*onClose={onClose}*/
                      showIcon
                      style={{marginTop:"10px",display:emailRequired}}
                  />
                </div>
                <div className="form-group" style={this.state.tokenExists===false?{display:'block'}:{display:'none'}}>
                  <Input.Password
                      prefix={<Icon type="lock"/>}
                      name="password"
                      placeholder="Enter password"
                      onChange={this.handleChange}
                      allowClear
                  />
                  <Alert
                      message={loginAlertMsg}
                      type="error"
                      icon=<Icon type="question"/>
                      showIcon
                  style={{marginTop:"10px",display:loginAlert}}
                  />
                  <Alert
                      message="Password required"
                      type="warning"
                      /*closable*/
                      showIcon
                      style={{marginTop:"10px",display:passwordRequired}}
                  />
                </div>
                <div className={'form-group'} style={this.state.tokenExists===true?{display:'block'}:{display:'none'}}>
                  <p>当前用户：</p>
                  <p>{this.state.currentUserInfo.email}</p>
                  <p>签发时间：{js_date_time(this.state.currentUserInfo.log_time*1000)}&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type={'link'} onClick={this.handleClearLogin}>注销</Button>
                  </p>
                  <p>
                    <Button type={'link'} onClick={this.ToggleTokenExist}>这不是您？</Button>
                  </p>
                </div>
                <div className="form-group">
                  <Button
                      type="primary"
                      htmlType="submit"
                      icon="check"
                      onClick={this.handleSubmit}
                      loading={this.state.submitLoading}
                  >登陆</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Login with
                  <Tooltip placement="topLeft" title="Bit account" arrowPointAtCenter>
                    <Button type="link" size="small" onClick={this.loginWith.bind(this,'bit')}>
                      <Avatar shape="square" size="small" src="https://www.dutbit.com/enroll/static/favicon.ico"/>
                    </Button>
                  </Tooltip>
                </div>
              </form>
            </div>
      );
    }

  }
}
