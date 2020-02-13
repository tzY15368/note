import {Input, Skeleton, Switch, Card, Icon, Avatar, Button, Popconfirm} from 'antd';
import React,{Component} from 'react'
import './search.css'
import axios from 'axios'
import cookie from 'react-cookies'
import BASEURL from "../../../../configs/names";
import {ErrorMsg} from "../../../../components/notifications";
import MyDisplayer from "../../../../components/displayer";
const { Search } = Input;
const { Meta } = Card;

export default class MySearch extends Component {
    state = {
        loading:false,
        listData:[]
    }
    handleSearch = (value) =>{
        console.log(value)
        this.setState({
            loading:!this.state.loading,
            listData:[
                {create_time:0,content:'',query_key:'',uid:'',id:0,tags:''},
                {create_time:0,content:'',query_key:'',uid:'',id:0,tags:''},
                {create_time:0,content:'',query_key:'',uid:'',id:0,tags:''}
            ]})
        console.log('loading state changed on SEARCH'+this.state.loading)
        const url = BASEURL+'/notes'
        const token = cookie.load('token')
        let prom
        if(value!==""){
            prom = axios.get(url,{
                headers:{Authorization:token},
                params:{
                    q:'123',
                    o:value
                }
            })
        } else {//takes back everything
            prom = axios.get(url,{
                headers:{Authorization:token},
                params:{
                    p:1

                }
            })
        }
        prom.then((res)=>{
            console.log(res)
            this.setState({
                loading:!this.state.loading,
                listData:res.data
            })
        }).catch((err)=>{
            console.log(err)
            this.setState({loading:!this.state.loading})
            ErrorMsg('网络错误')
        })

    }
    doEdit = (id) =>{

    }
    doShare = (id) =>{

    }
    doDelete = (id)=>{

    }
    render(){
        const {loading,listData} = this.state
        let cardOutput = listData.map((data,index)=>{
                    //console.log(data)
                    return (
                        <li key={index} style={{listStyleType:"none"}}>
                            <Card
                                style={{  marginTop: 16 }}
                                actions={[
                                    <Button type="link" onClick={this.doEdit.bind(this,data.id)}><Icon type="edit"/></Button>,
                                    <Button type="link" onClick={this.doShare.bind(this,data.id)}><Icon type="share-alt"/></Button>,
                                    <Popconfirm
                                        title="Are you sure？"
                                        okText="Yes"
                                        cancelText="No"
                                        onConfirm={this.doDelete.bind(this,data.id)}
                                    ><Button type="link"  ><Icon type="delete"/></Button></Popconfirm>
                                ]}
                            >
                                <Skeleton loading={loading} avatar active>
                                    <Meta
                                        title={data.query_key}
                                        description={<div dangerouslySetInnerHTML={{__html: data.content}}></div>}
                                    />
                                </Skeleton>
                            </Card>
                        </li>

                    )
                })

        return (
            <div>
                <div style={{position:"fixed",overflow:"hidden","zIndex":"1"}}>
                    <Search
                        className="searchInput"
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={this.handleSearch}
                        loading={loading}
                    />
                </div>

                <div style={{padding:"40px 0px 0px 0px"}}>
                    {/*<ul style={{margin:"0px",padding:"0px"}}>
                        {cardOutput}
                    </ul>*/}
                    <MyDisplayer newListData = {this.state.listData} loadingState = {loading}/>
                </div>

            </div>
        )
    }
}

