import React,{Component} from 'react'
import {Row, Col, Input, Button, Icon, Divider} from "antd";
import {connect} from "react-redux";

class ProfileAmend extends Component {
    constructor(props) {
        super(props);
        //console.log('!!!!!!!!!!!!!!!!!'+JSON.stringify(props))
        this.state = {
            userInfo:props.user,
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
        if(target==='mailLock'){
            this.setState({mailLock:{locked:!this.state.mailLock.locked,iconType:'loading'}});
            setTimeout(()=>{this.setState({mailLock:{locked:this.state.mailLock.locked,iconType:'check'}})},2000);
            setTimeout(()=>{this.setState({mailLock:{locked:!this.state.mailLock.locked,iconType:'lock'}})},4000);
        }
        else if(target==='usernameLock'){
            this.setState({usernameLock:{locked:!this.state.usernameLock.locked,iconType:'loading'}});
            setTimeout(()=>{this.setState({usernameLock:{locked:this.state.usernameLock.locked,iconType:'check'}})},2000);
            setTimeout(()=>{this.setState({usernameLock:{locked:!this.state.usernameLock.locked,iconType:'lock'}})},4000);
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
    render(){
        console.log(JSON.stringify(this.props.user));
        const {mailLock,usernameLock,userInfo} = this.state;
        const emaillock = (
            <Button type="link" size="small" onClick={this.handleLock.bind(this,'mailLock')}><Icon type={mailLock.iconType}/></Button>
        );
        const usernamelock = (
            <Button type="link" size="small" onClick={this.handleLock.bind(this,'usernameLock')}><Icon type={usernameLock.locked?"lock":"save"}/></Button>
        );
        return (
            <Col>
                <div className="form-group">
                    <Input addonAfter={emaillock} addonBefore={<Icon type="mail"/>} defaultValue={userInfo.email} disabled={mailLock.locked} />
                </div>
                <div className="form-group">
                    <Input addonAfter={usernamelock} addonBefore={<Icon type="user"/>} defaultValue={userInfo.username} disabled={usernameLock.locked}/>
                </div>
                <Divider/>
            </Col>
        )
    }
}
export default connect(
    state =>({user:state.user}),{}
)(ProfileAmend)