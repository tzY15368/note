import React,{Component} from 'react'
import {Skeleton, Switch, List, BackTop, Icon, Button, Modal, Tooltip, Popconfirm, Col, Divider} from 'antd';
import axios from 'axios'
import cookie from 'react-cookies'
import BASEURL from "../../../../../../configs/names";
import {connect} from "react-redux";
import {ErrorMsg, SuccessMsg} from "../../../../../../components/notifications";
import MyEditor from "../../../../../../components/editor";
import MyDisplayer from "../../../../../../components/displayer";
import js_date_time from "../../../../../../utils/datetime";
import HeaderMidMainDisp from "../header-mid-main-disp/header-mid-main-disp";
class FrontNotes extends Component {
    state = {
        visible:false,
        skeletonAvatar:false,
        loading: true,
        modalLoading:false,
        modalContent:'',
        modalQuery_key:'',
        modalTargetId:0,
        listData:[
            {create_time:0,content:'',query_key:'',uid:'',id:0,tags:''},
            {create_time:0,content:'',query_key:'',uid:'',id:0,tags:''},
            {create_time:0,content:'',query_key:'',uid:'',id:0,tags:''}
            ]
    };
    componentWillReceiveProps(nextProps, nextContext) {
        if(this.state.listData.length!==0){
            if(nextProps.newNote.id>this.state.listData[0].id){
                console.log(JSON.stringify(nextProps.newNote))
                console.log('this is new')
                let latest_id = this.state.listData[0].id
                if(nextProps.newNote.id!==0&&nextProps.newNote.id!==latest_id){
                    console.log('!=0')
                    let oldNotes = this.state.listData
                    oldNotes.unshift(nextProps.newNote)
                    this.setState({listData:oldNotes})
                    console.log('set success')
                }
            }
            else {
                console.log('this is an update')
                //console.log(JSON.stringify(this.state.listData))
                console.log('newnote:'+JSON.stringify(nextProps.newNote))
                let newListData = this.state.listData
                for(let i=0;i<this.state.listData.length;i++){
                    if(this.state.listData[i].id===nextProps.newNote.id){
                        console.log(nextProps.newNote.id)
                        console.log(newListData[i])
                        newListData[i] = nextProps.newNote
                        break
                    }
                }
                this.setState({listData:newListData})
                console.log('finish')
            }


        } else {
            if(nextProps.newNote.id!==0){
                console.log('!=0')
                let oldNotes = this.state.listData
                oldNotes.unshift(nextProps.newNote)
                console.log('set success')
                //result.unshift(this.props.newNote)
            }
        }
    }

    componentDidMount = () => {
        console.log('front mounted: requsting')
        const token = cookie.load('token')
        const url = BASEURL+'/notes'
        if(token!==undefined){
            axios.get(url, {
                params:{f:'1'},
                headers:{Authorization:token}
            }).then((res) =>{
                    let result = res.data
                    /*if(this.props.newNote.id!==0){
                        console.log('!=0')
                        result.unshift(this.props.newNote)
                    }*/
                    this.setState({
                        listData:result,
                        loading:false
                    })
                    //console.log('--------'+this.state.listData)
                }

            ).catch((Error) =>{
                    console.log(Error)
                    ErrorMsg("网络错误:"+Error)
                }
            )
        }
    }
    doDelete = (id) =>{
        console.log(id)
        const url = BASEURL+'/notes?id='+id
        const token = cookie.load('token')
        if(token!==undefined){
            axios.delete(url,{
                headers:{Authorization:token}
            }).then((res)=>{
                if(res.data.code===1001){
                    console.log(res.data.data)
                    let list = this.state.listData
                    for(let i=0;i<list.length;i++){
                        if(list[i].id===id){
                            list.splice(i,1)
                        }
                    }
                    this.setState({listData:list})
                    SuccessMsg(res.data.data)
                }
                else {
                    ErrorMsg("服务器错误，错误代码"+res.data.code)
                }
            }).catch((err)=>{
                console.log(err)
                ErrorMsg("网络错误:"+err)
            })
        }

    }
    doEdit = (id) =>{
        console.log(id)
        for(let i=0;i<this.state.listData.length;i++){
            if(this.state.listData[i].id===id){
                this.setState({
                    modalTargetId:id,
                    modalContent:this.state.listData[i].content,
                    modalQuery_key:this.state.listData[i].query_key,
                    visible:true,
                })
            }
        }
    }
    editFinish = () =>{
        this.setState({visible:false})
    }
    handleModalCancel = () => {
        this.setState({
            visible: false ,
            modalTargetId:0,
            modalContent:'',
            modalQuery_key:''

        });
    };
    doShare = (id) =>{

    }
    render(){
        const { loading, skeletonAvatar,visible } = this.state;
        console.log(JSON.stringify(this.state.listData))
        //console.log(skeletonAvatar)
        return (
                <Col md={24} sm={24} xs={24}>
                    <Col md={{span:22,offset:1}} sm={0} xs={0} className="panel-body">
                        <MyEditor/>
                        <Divider/>
                    </Col>
                    <Col md={{span:22,offset:1}} sm={{span:22,offset:1}} xs={{span:22,offset:1}}>
                        <BackTop />
                        <Modal
                            visible={visible}
                            title="编辑"
                            onOk={this.handleModalOk}
                            onCancel={this.handleModalCancel}
                            footer={[
                                <Button key="back" onClick={this.handleModalCancel}>
                                    Return
                                </Button>
                            ]}
                        >
                            <MyEditor
                                editFinish = {this.editFinish}
                                isUpdate={{
                                    modalContent: this.state.modalContent,
                                    modalQuery_key: this.state.modalQuery_key,
                                    modalTargetId: this.state.modalTargetId,
                                    modalFront:"1",
                                }}

                            />
                        </Modal>
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={this.state.listData}
                            pagination={{
                                /*onChange: page => {
                                    console.log(page);
                                },*/
                                pageSize: 6,
                            }}
                            renderItem={item => (
                                <List.Item
                                    key={item.id}
                                    actions={
                                        !loading && [
                                            <Button type="link" onClick={this.doEdit.bind(this,item.id)}><Icon type="edit"/></Button>,
                                            <Button type="link" onClick={this.doShare.bind(this,item.id)}><Icon type="share-alt"/></Button>,
                                            <Popconfirm
                                                title="Are you sure？"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={this.doDelete.bind(this,item.id)}
                                            ><Button type="link"  ><Icon type="delete"/></Button></Popconfirm>



                                        ]
                                    }
                                >
                                    <Skeleton loading={loading} active avatar={skeletonAvatar}>
                                        <List.Item.Meta
                                            //avatar={<Avatar src={item.userId} />}
                                            title={item.query_key+"\r"+js_date_time(item.create_time*1000)}
                                        />{/*
                                {item.content}*/}
                                        <div dangerouslySetInnerHTML={{__html: item.content}} style={{overflowX:"auto"}}></div>
                                    </Skeleton>{/*
                            */}
                                </List.Item>
                            )}
                        />
                    </Col>
                </Col>
        )
    }
}
export default connect(
    state=>({
        newNote:state.note,
        user:state.user
        }),{}
)(FrontNotes)