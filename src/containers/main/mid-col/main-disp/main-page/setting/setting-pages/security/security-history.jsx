import React,{Component} from 'react'
import BASEURL from "../../../../../../../../configs/names";
import axios from 'axios'
import cookie from 'react-cookies'
import {ErrorMsg} from "../../../../../../../../components/notifications";
import {Button,List, Typography} from "antd";
export default class AccountHistory extends Component {
    state = {
        dataList:[],
        loading:true,
    };
    handleClick = e =>{
        console.log(this.state)
        this.setState({loading:true});
        this.fetchData()
    }
    fetchData(){
        const url = BASEURL + '/acc_history';
        const token = cookie.load('token');
        if(cookie!==undefined){
            axios.get(url,{headers:{Authorization:token}}).then(
                (res)=>{
                    if(res.data.success===1){
                        this.setState({
                            loading:false
                        })
                    } else {
                        let promptMsg=res.data.data;
                        ErrorMsg(promptMsg);
                        this.setState({
                            loading:false
                        })
                    }
                }
            ).catch(
                (err)=>{ErrorMsg('网络错误：'+err);this.setState({loading:false})}
            )

        }else {ErrorMsg('登录态错误')}
    }
    componentWillMount() {
        this.fetchData()
    }

    render(){
        const {dataList,loading} = this.state;
        return (
            <div style={{marginRight:'5%',marginLeft:'0%',marginTop:10}}>

                <List
                    header={<div style={{fontSize:20}}>登陆记录 <Button loading={loading} icon={'redo'} onClick={this.handleClick}/></div>}
                    bordered
                    dataSource={dataList}
                    renderItem={item => (
                        <List.Item>
                            <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}