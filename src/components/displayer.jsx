import React,{Component} from 'react'
import {Button, Icon, List, Modal, Popconfirm, Skeleton} from "antd";
import MyEditor from "./editor";
import BASEURL from "../configs/names";
import cookie from "react-cookies";
import axios from 'axios'
import {ErrorMsg, SuccessMsg} from "./notifications";
import {connect} from "react-redux";
import js_date_time from "../utils/datetime";
class MyDisplayer extends Component {
    state = {
        loading:false,
        visible:false,
        skeletonAvatar:false,
        modalLoading:false,
        modalContent:'',
        modalQuery_key:'',
        modalTargetId:0,
        pagination:false,
        listData:[/*
            {create_time:0,content:'',query_key:'',uid:'',id:0,tags:''},
            {create_time:0,content:'',query_key:'',uid:'',id:0,tags:''},
            {create_time:0,content:'',query_key:'',uid:'',id:0,tags:''}*/
        ]
    }
    componentWillReceiveProps(nextProps, nextContext) {
        //老的数据：this.state.listData
        //全部更新：nextprops.newListData
        //更新回来的一个：nextProps.newNote
        //console.log('++++++'+nextProps.loadingState)
        this.setState({
            loading:nextProps.loadingState
        })
        //console.log('next props loading state'+nextProps.loadingState)
        if(nextProps.newListData!==undefined){//全部更新的情况
            if(nextProps.newListData!==[]){
                this.setState({
                    loading:false,
                    listData:nextProps.newListData,
                    pagination:{pageSize:6}
                })
            } else{
                this.setState({
                    pagination:false
                })
            }
        } else if(nextProps.newNote!==undefined){//比对原有和更新回来一个数据
            if(this.state.listData.length!==0){
                if(nextProps.newNote.id>this.state.listData[0].id){
                    //console.log(JSON.stringify(nextProps.newNote))
                    //console.log('this is new')
                    let latest_id = this.state.listData[0].id
                    if(nextProps.newNote.id!==0&&nextProps.newNote.id!==latest_id){
                        //console.log('!=0')
                        let oldNotes = this.state.listData
                        oldNotes.unshift(nextProps.newNote)
                        this.setState({listData:oldNotes})
                        //console.log('set success')
                    }
                }
                else {
                    //console.log('this is an update')
                    //console.log(JSON.stringify(this.state.listData))
                    //console.log('newnote:'+JSON.stringify(nextProps.newNote))
                    let newListData = this.state.listData
                    for(let i=0;i<this.state.listData.length;i++){
                        if(this.state.listData[i].id===nextProps.newNote.id){
                            //console.log(nextProps.newNote.id)
                            //console.log(newListData[i])
                            newListData[i] = nextProps.newNote
                            break
                        }
                    }
                    this.setState({listData:newListData})
                    //console.log('finish')
                }


            } else {
                if(nextProps.newNote.id!==0){
                    //console.log('!=0')
                    let oldNotes = this.state.listData
                    oldNotes.unshift(nextProps.newNote)
                    //console.log('set success')
                    //result.unshift(this.props.newNote)
                }
            }
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
    doShare = (id) =>{}
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
    render(){
        const {loading,skeletonAvatar,visible} = this.state
        console.log('DISPLAYER LOADING STATE:'+loading)
        return (
            <div>
                <div>
                    <Modal
                        visible={visible}
                        title="编辑"
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
                </div>
                <hr/>
                <div>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={this.state.listData}
                        pagination={this.state.pagination}
                        /*{{
                            /!*onChange: page => {
                                console.log(page);
                            },*!/
                            pageSize: 6,
                        }}*/
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                actions={
                                    !loading && [

                                        <Button type="link" onClick={this.doEdit.bind(this,item.id)} size="small"><Icon type="edit"/></Button>,
                                        <Button type="link" onClick={this.doShare.bind(this,item.id)} size="small"><Icon type="share-alt"/></Button>,
                                        <Popconfirm
                                            title="Are you sure？"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={this.doDelete.bind(this,item.id)}
                                        ><Button type="link"  size="small"><Icon type="delete"/></Button></Popconfirm>
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
                </div>

            </div>
        )
    }
}
export default connect(
    state=>({
        newNote:state.note,
        user:state.user
    }),{}
)(MyDisplayer)