import React,{Component} from 'react'
import {Input, Button, Icon, Col} from "antd";
import cookie from 'react-cookies';
import Base64 from 'js-base64';
import {SuccessMsg} from "../../../../../../../../components/notifications";
export default class AccountKeys extends Component {
    constructor(props) {
        super(props);
        let c = cookie.load('key');
        if(c!==undefined) {
            this.state = {
                key: atob(c)
            };
            console.log(c);
        } else {
            this.state = {key:''};
        }
    }

    handleChange = (e)=>{
        this.setState({
            key:e.target.value
        })
    };
    setKey = ()=>{
        cookie.save('key',btoa(this.state.key));
        SuccessMsg('设置成功')
    };
    render(){
        return (
            <Col>
                <br/>

                <div className="form-group">
                    <Input.Password
                        prefix={<Icon type="lock"/>}
                        name="password"
                        value={this.state.key}
                        placeholder="Enter enc key"
                        onChange={this.handleChange}
                        allowClear
                    />
                </div>
                <div className="form-group">
                    <Button onClick={this.setKey} type={'primary'}>设置</Button>
                </div>
            </Col>
        )
    }
}