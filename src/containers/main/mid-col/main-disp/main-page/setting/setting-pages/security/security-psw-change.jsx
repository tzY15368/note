import React,{Component} from 'react'
import {Steps, Icon, Button, Result, Input} from 'antd';
import './security.css'
import {Redirect} from "react-router";
import axios from 'axios'
import BASEURL from "../../../../../../../../configs/names";
import cookie from 'react-cookies'
import {ErrorMsg} from "../../../../../../../../components/notifications";
const { Step } = Steps;
export default class PasswordChange extends Component {
    state = {
        current:0,
        pswInput:'',
        promptMsg:'输入旧密码:',
        loading:false,
        redirect:false
    };
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    handleChange = (e)=>{
        console.log(e.target.value);
        this.setState({pswInput:e.target.value});
    };
    handleSubmit = (e)=>{
        this.setState({ loading:true });
        const url = BASEURL+'/user';
        const token = cookie.load('token');
        if(this.state.current===0){
            if(token!==undefined){
                axios.put(url,{operationType:1,password:this.state.pswInput},{headers:{Authorization:token}
                }).then((res)=>{
                    if(res.data.success===1){
                        this.setState({current:this.state.current+1,loading:false,pswInput:'',promptMsg:'输入新密码'})
                    }
                    else {
                        this.setState({loading:false,pswInput:'',promptMsg:res.data.data})
                    }
                }).catch((err)=>{ErrorMsg('网络错误：'+err)});
            } else {ErrorMsg('cookie error')}
        } else if(this.state.current===1){
            if(token!==undefined){
                axios.put(url,{operationType:2,password:this.state.pswInput},{headers:{Authorization:token}
                }).then((res)=>{
                    if(res.data.success===1){
                        this.setState({current:this.state.current+1,loading:false,pswInput:'',promptMsg:'not sure'});
                        cookie.remove('token');
                        setTimeout(()=>{this.setState({redirect:true})},2500)
                    }
                    else {
                        this.setState({loading:false,pswInput:'',promptMsg:res.data.data})
                    }
                }).catch((err)=>{ErrorMsg('网络错误：'+err)});
            } else {ErrorMsg('cookie error')}
        }
    };
    handleRedirect = ()=>{
        this.setState({redirect:true})
    }
    render(){
        const {current,promptMsg,loading} = this.state;
        const inputs = (
            <div>
                <div className="form-group">
                    <span><h5>{promptMsg}</h5></span>
                </div>
                <div className="form-group" style={{marginTop:10}}>
                    <Input.Password
                        prefix={<Icon type="lock"/>}
                        name="oldPsw"
                        placeholder="Enter password"
                        onChange={this.handleChange}
                        allowClear
                        value={this.state.pswInput}
                    />
                </div>
                <div className="form-group" style={{textAlign:'right'}}>
                    <Button type="primary" onClick={this.handleSubmit} loading={loading}>下一步</Button>
                </div>
            </div>
        );
        const steps = [
            {
                title: '验证',
                content: inputs
            },
            {
                title: '更新',
                content: inputs,
            },
            {
                title: '完成',
                content: (
                    <Result
                        status='success'
                        title="更改成功"
                        subTitle="三秒后重定向至登陆页"
                        extra={[
                            <Button key="buy" onClick={this.handleRedirect}>手动跳转</Button>,
                        ]}
                    />
                ),
            },
        ];
        if(this.state.redirect===true){
            return(
                <Redirect to={'/user'}/>
            )
        }
        return (
            <div>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
            </div>
        )
    }
}