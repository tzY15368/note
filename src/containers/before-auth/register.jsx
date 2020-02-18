import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Input, Button, Icon, Alert,message,Upload} from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import axios from 'axios'
import BASEURL from '../../configs/names'
import {ErrorMsg, SuccessMsg} from "../../components/notifications";
import {ValidateEmail,ValidatePassword,ValidateUsername} from "../../utils/validator";
import {encrypt} from "../../utils/encrypts";
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
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
        uploading:false,
        imageUrl:''
    };
    handleUploadChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
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
                            SuccessMsg('Registration success, redirecting...');
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
    };
    render() {
        if(this.state.redirect===true){
            return(
                <Redirect push to="/user/login"/>
            )
        } else {
            const {emailAlert,usernameAlert,passwordAlert,passwordRequired,emailRequired,usernameRequired,duplicateAlert,imageUrl} = this.state;
            const uploadButton = (
                <div>
                    <Icon type={this.state.loading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">Upload</div>
                </div>
            );
            return (
                <div>

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
                                    /*closable*/
                                    showIcon
                                    style={{marginTop:"10px",display:emailRequired}}
                                />
                                <Alert
                                    message="Invalid Email"
                                    type="error"
                                    showIcon
                                    /*closable*/
                                    style={{marginTop:"10px",display:emailAlert}}
                                />
                                <Alert
                                    message="Duplicate Email"
                                    type="error"
                                    showIcon
                                    /*closable*/
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
                                    /*closable*/
                                    showIcon
                                    style={{marginTop:"10px",display:usernameRequired}}
                                />
                                <Alert
                                    message="Invalid username"
                                    type="error"
                                    showIcon
                                    /*closable*/
                                    style={{marginTop:"10px",display:usernameAlert}}
                                />
                            </div>
                            <div className="form-group">
                                <Input.Password
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={this.handleChange}
                                    allowClear
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />
                                <Alert
                                    message="Password required"
                                    type="warning"
                                    /*closable*/
                                    showIcon
                                    style={{marginTop:"10px",display:passwordRequired}}
                                />
                                <Alert
                                    message="Invalid password"
                                    type="error"
                                    showIcon
                                    /*closable*/
                                    style={{marginTop:"10px",display:passwordAlert}}
                                />
                            </div>
                            <div className="form-group">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleUploadChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
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

            )
        }

    }


}