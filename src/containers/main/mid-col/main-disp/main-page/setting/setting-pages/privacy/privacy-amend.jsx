import React,{Component} from 'react'
import {Switch,Button,Divider} from "antd";
import axios from 'axios'
import BASEURL from "../../../../../../../../configs/names";
import cookie from 'react-cookies'
import {ErrorMsg} from "../../../../../../../../components/notifications";
export default class PrivacyAmend extends Component {
    state = {
        loading:true,
        shareDisabled:false,
        shareAllowed:true,
        dmDisabled:false,
        dmAllowed:true,
    };
    componentWillMount = ()=> {
        const url = BASEURL+'/privacy';
        const token = cookie.load('token');
        if(token===undefined){
            ErrorMsg('登录态失效');
            return
        }
        axios.get(url,{headers:{Authorization:token}}).then((res)=>{
            this.setState({loading:false});
            if(res.data.success===1){
                this.setState({
                    /*toggle switch*/
                })
            } else {
                ErrorMsg('查询错误：'+res.data.data);
                this.setState({
                    shareDisabled:true,
                    dmDisabled:true
                })
            }
        }).catch((err)=>{
            ErrorMsg('网络错误：'+err);
            this.setState({loading:false});
            this.setState({
                //shareDisabled:true,
                //dmDisabled:true
            })
        })
    };
    handleChange = (name,i,j) =>{
        //true is false, false is true here.
        console.log('old state is:',/*'dm:',this.state.dmAllowed,*/'share:',this.state.shareAllowed)
        const url = BASEURL+'/privacy';
        const token = cookie.load('token');
        if(token===undefined){
            ErrorMsg('登录态失效');
            return
        }
        this.setState({
            loading:true,
            shareDisabled:true,
            dmDisabled:true
        });
        console.log('axios: ',JSON.stringify({'share':!this.state.shareAllowed,'dm':!this.state.dmAllowed}))
        axios.post(url,{'share':!this.state.shareAllowed,'dm':!this.state.dmAllowed}).then((res)=>{
            if(res.data.success===1){
                this.setState({
                    loading:false,
                    shareDisabled:false,
                    dmDisabled:false
                });
                if(name==='share'){
                    this.setState({
                        shareAllowed:i,
                    })
                } else if(name==='dm'){
                    this.setState({
                        dmAllowed:i
                    })
                }
                console.log('new state is:',/*'dm:',this.state.dmAllowed,*/'share:',this.state.shareAllowed)
            } else {
                ErrorMsg('请求错误：'+res.data.data);
                this.setState({
                    loading:false,
                    shareDisabled:false,
                    dmDisabled:false
                });
            }

        }).catch((err)=>{
            ErrorMsg('网络错误：'+err);
            this.setState({
                loading:false,
                shareDisabled:false,
                dmDisabled:false
            });
        })

    };
    render(){
        const {shareDisabled,dmDisabled,loading,shareAllowed,dmAllowed} = this.state;
        return (
            <div>
                <Divider orientation="left"><strong>分享</strong></Divider>
                <span>
                    允许分享&nbsp;&nbsp;&nbsp;&nbsp;<Switch checked={shareAllowed} disabled={shareDisabled} loading={loading} onChange={this.handleChange.bind(this,'share')}/>
                </span>
                <Divider orientation="left"><strong>私信</strong></Divider>
                <span>
                    允许私信&nbsp;&nbsp;&nbsp;&nbsp;<Switch  checked={dmAllowed} disabled={dmDisabled} loading={loading} onChange={this.handleChange.bind(this,'dm')}/>
                </span>
            </div>
        )
    }
}