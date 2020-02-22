import React,{Component} from 'react'
import {Result, Button, Popconfirm, Icon, Input, Col, Divider} from 'antd';
import {Redirect} from "react-router";
import {connect} from "react-redux";
import './security.css'
import axios from 'axios'
import BASEURL from "../../../../../../../../configs/names";
import cookie from "react-cookies";
import {ErrorMsg} from "../../../../../../../../components/notifications";
class AccountRm extends Component {
    state = {
        emailInput:'',
        ajaxStatus:false,
        deleteStatus:false,
        redirect:false,
        delButtonDisabled:true,
        errorMessages:'',
        delButtonLoading:false
    };
    doRemove = () =>{
        if(this.state.emailInput===this.props.user.email){
            this.setState({
                delButtonLoading:true,
            });
            const url = BASEURL+'/user';
            const token = cookie.load('token');
            if(token!==undefined){
                axios.delete(url,{
                    headers:{Authorization:token}
                }).then((res)=>{
                    this.setState({ajaxStatus:true});
                    if(res.data.success===1){
                        this.setState({deleteStatus:true});
                        setTimeout(()=>{this.setState({redirect:true})},3000)
                    }
                    else {
                        this.setState({
                            errorMessages:res.data.data
                        })
                    }
                }).catch((err)=>{
                    ErrorMsg('网络错误：'+err);
                    this.setState({
                        delButtonLoading:false,
                    });
                })
            }/*
            setTimeout(()=>{this.setState({ajaxStatus:true,deleteStatus:true})},2000);
            //如果是失败则不要跳转
            setTimeout(()=>{this.setState({redirect:true})},4000)*/
        }
    };
    handleChange = (e) =>{
        this.setState({
            emailInput:e.target.value
        });
        e.target.value===this.props.user.email?
            this.setState({delButtonDisabled:false}):
            this.setState({delButtonDisabled:true})
    };
    render(){
        const {redirect,ajaxStatus,deleteStatus,errorMessages,delButtonDisabled,delButtonLoading} = this.state;
        const {email} = this.props.user;
        if(redirect){
            return(
                <Redirect to={'/user'}/>
            )
        }
        if(ajaxStatus){
            if(deleteStatus){
                return (
                    <Result
                        status='success'
                        title="注销成功"
                        subTitle="三秒后重定向至注册页"
                        extra={[
                            <Button key="buy">手动跳转</Button>,
                        ]}
                    />
                )
            } else {
                return (
                    <Result
                        status='error'
                        title="注销失败"
                        subTitle={errorMessages}
                    />
                )
            }
        } else {
            return(
                <Col>
                    <div className="form-group unsel" >
                        <h4><strong><Icon type={'warning'}/>即将删除账号{email}，<i>该步骤不可逆</i></strong></h4>
                    </div>
                    <div className="form-group" style={{}}>
                        <Input onChange={this.handleChange} placeholder={'在此框中输入您的邮箱以确认'} allowClear style={{}}></Input><br/>
                    </div>
                    <div className="form-group">
                        <Button  icon="delete" type="danger" onClick={this.doRemove} block loading={delButtonLoading} disabled={delButtonDisabled}>删除账号</Button>
                    </div>
                    <Divider/>
                </Col>
            )
        }
    }
}
export default connect(
    state =>({user:state.user}),{}
)(AccountRm)