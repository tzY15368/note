import React,{Component} from 'react'
import {Button, Input, Switch, Icon, Tag, DatePicker,Tooltip} from "antd";
import JoditEditor from "jodit-react";
import cookie from "react-cookies";
import axios from 'axios'
import BASEURL from "../configs/names";
import {ErrorMsg, SuccessMsg} from "./notifications";
import './editor.css'
import {connect} from "react-redux";
import {SetNewNote} from "../redux/actions";
class MyEditor extends Component {
    componentWillMount = () => {
        const token = cookie.load('token')
        this.setState({token:token})
        if(this.props.isUpdate!==undefined){
            this.setState({
                notFromFront:false,
                promptString:"更新",
                contentInput:this.props.isUpdate.modalContent,
                keyInput:this.props.isUpdate.modalQuery_key,
                updateId:this.props.isUpdate.modalTargetId,
                front:this.props.isUpdate.modalFront
            })
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            contentInput:nextProps.isUpdate.modalContent,
            keyInput:nextProps.isUpdate.modalQuery_key,
            updateId:nextProps.isUpdate.modalTargetId
        })
    }

    state = {
        notFromFront:true,
        promptString:"提交",
        updateId:0,
        alertCalendarDisp:'none',
        token:'',
        loading:false,
        contentInput:"",
        keyInput:"",
        alert:"0",
        alert_time:"",
        front:"0"
    }
    updateContent = value => {
        this.setState({ contentInput: value });
    }
    /**
     * @property Jodit jodit instance of native Jodit
     */
    jodit;
    setRef = jodit => (this.jodit = jodit);

    config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    };
    handleChange = (e) =>{
        this.setState({keyInput:e.target.value})
    }
    doSubmit = () =>{
        if(this.state.token!==undefined){
            var that = this
            const {contentInput,keyInput} = this.state
            if(contentInput==="" || keyInput===""){
                ErrorMsg("Empty!")
            }
            else {
                if(this.props.isUpdate===undefined){
                    console.log('starting POST: '+this.state)
                    this.setState({loading:!this.state.loading})
                    axios({
                        method: 'post',
                        url: BASEURL+'/notes',
                        data: {
                            content:this.state.contentInput,
                            query_key:this.state.keyInput,
                            tags:"",
                            front:this.state.front,
                            alert:this.state.alert,
                            alert_time: this.state.alert_time
                        },
                        headers:{Authorization:this.state.token}
                    })
                        .then((res) =>{
                            console.log(res);
                            that.setState({loading:!that.state.loading})
                            if(res.data.code===1001){
                                const newId = res.data.detail
                                const note = {
                                    id: newId,
                                    query_key: this.state.keyInput,
                                    content: this.state.contentInput
                                }
                                if(this.state.front==="1"){
                                    this.props.SetNewNote(note)
                                    console.log('setting new note here')
                                }
                                that.setState({
                                    contentInput:"",
                                    keyInput:"",
                                    tags:"",
                                    alert_time:"0"
                                })

                                SuccessMsg(res.data.data)
                                console.log(that.state)


                            }
                            else {
                                ErrorMsg('服务器错误：'+res.data.data+':'+res.data.detail)

                            }
                        })
                        .catch((error) =>{
                            console.log(error);
                            that.setState({loading:!that.state.loading})
                            ErrorMsg('网络错误：'+error)

                        });
                    if(this.props.isNew!==undefined){
                        this.props.newFinish()
                    }
                }
                else {
                    console.log('starting PUT:' +this.state.updateId)
                    this.setState({loading:!this.state.loading})
                    const url = BASEURL+'/notes'
                    console.log(JSON.stringify(this.state))
                    const note = {
                        id: this.state.updateId,
                        query_key: this.state.keyInput,
                        content: this.state.contentInput
                    }
                    console.log('==============='+JSON.stringify(note))
                    axios.put(url,{
                        updateId:this.state.updateId,
                        content:this.state.contentInput,
                        query_key:this.state.keyInput,
                        tags:"",
                        front:this.state.front,
                        alert:this.state.alert,
                        alert_time: this.state.alert_time
                    },{
                        headers:{Authorization:this.state.token}
                    }).then((res)=>{
                        this.setState({loading:!this.state.loading})
                        if(res.data.code===1001){
                            console.log('--------------'+note)
                            //const newId = this.state.updateId
                            /*const note = {
                                id: newId,
                                query_key: this.state.keyInput,
                                content: this.state.contentInput
                            }*/
                            if(this.state.front==="1"){
                                this.props.SetNewNote(note)
                                console.log('updating note here:'+JSON.stringify(note))
                            }
                            that.setState({
                                contentInput:"",
                                keyInput:"",
                                tags:"",
                                alert_time:"0"
                            })
                            SuccessMsg(res.data.data)
                        }else {
                            ErrorMsg("服务器错误："+res.data.detail)

                        }
                    }).catch((err)=>{
                        console.log(err)
                        ErrorMsg("网络错误："+err)
                        this.setState({loading:!this.state.loading})
                    })
                    this.props.editFinish()
                }
            }
        } else {
            ErrorMsg("登录态失效")
        }
    }
    handleFrontChange = (e) =>{
        console.log(e)
        if(e===false){
            this.setState({
                front:"1"
            })
        } else {
            this.setState({
                front:"0"
            })
        }
        console.log(this.state)

    }
    handleAlertChange = (e) =>{
        console.log(e)
        if(e===false){
            this.setState({
                alert:"1",
                alertCalendarDisp:"inline-block"
            })
        } else {
            this.setState({
                alert:"0",
                alertCalendarDisp:"none"
            })
        }
    }
    onTimeChange = (value,dateString) =>{
        console.log(value,dateString)

    }
    onTimeOk = (value) =>{
        console.log('this is ok'+value)
        this.setState({
            alert_time:value/1000
        })
    }
    render(){
        return (
            <div>
                <Input
                    size="large"
                    allowClear
                    placeholder="Enter key, separated by ||"
                    value={this.state.keyInput}
                    onChange={this.handleChange}
                    style={{marginBottom:"10px"}}
                />
                <JoditEditor
                    editorRef={this.setRef}
                    value={this.state.contentInput}
                    config={this.config}
                    onChange={this.updateContent}
                    styleName="textarea"
                    Name="body"
                />
                <div className="toolBar">
                    <Tooltip title="前台可见开关">
                        <Switch
                            checkedChildren={<Icon type="eye-invisible" />}
                            unCheckedChildren={<Icon type="eye" />}
                            defaultChecked={this.state.notFromFront}
                            size="default"
                            onChange={this.handleFrontChange}
                        />
                    </Tooltip>&nbsp;&nbsp;
                    <Tooltip title="提醒开关">
                        <Switch
                            checkedChildren={<Icon type="stop" />}
                            unCheckedChildren={<Icon type="clock-circle" />}
                            defaultChecked
                            size="default"
                            onChange={this.handleAlertChange}
                            className="alertSwitch"
                        />
                    </Tooltip>&nbsp;
                    <div style={{display:this.state.alertCalendarDisp}} className="calendarInput">
                        <DatePicker showTime placeholder="Select Time" onChange={this.onTimeChange} onOk={this.onTimeOk} />
                    </div>

                    <Button type="primary" loading={this.state.loading} className="submitButton" onClick={this.doSubmit}>{this.state.promptString}</Button>
                </div>

            </div>
        )
    }
}

export default connect(
    state=>({}),{SetNewNote}
)(MyEditor)