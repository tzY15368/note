import { Menu, Icon, Button,Modal , Row, Col,Layout} from 'antd';

import {NavLink} from 'react-router-dom'
import React,{Component} from 'react'
import MyNavLink from "../../../../components/my-nav-link";
import MyEditor from "../../../../components/editor";
const { Header, Content, Footer, Sider } = Layout;
export default class MyMenu extends Component {
    GoToSettings = () =>{
        console.log('to settings in menu')
        this.props.ToSettings()

        //this.props.history.push('/settings')
    };

    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            loading:false,
            showHeader:'block'
        };
        //console.log(JSON.stringify(props));
        if(props.showHeader!==undefined){
            console.log(props.showHeader);
            this.state.showHeader=props.showHeader
        }
    }
    handleModalCancel = () => {
        this.setState({ visible: false });
    };
    handleModalOk = () => {
        this.setState({ visible: false });
    };
    handleNew = ()=>{
        this.setState({visible:true})
    }
    newFinish = () =>{
        this.setState({visible:false})
    }
    render(){
        const {visible,loading} = this.state
        return (
            <div >
                <div >
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
                        <MyEditor newFinish = {this.newFinish} isNew={true}/>
                    </Modal>
                </div>
                <div className="list-group" style={{"marginTop":"10px",display:this.state.showHeader}}>
                    {/*导航路由链接*/}
                    <NavLink to='/main'><h2>Leave notes now</h2></NavLink>
                </div>
                <Menu
                    defaultSelectedKeys={['0']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"

                >
                    <Menu.Item key="0">
                        <MyNavLink to='/main'>
                            <Icon type="home" style={{ fontSize: '18px'}}/>
                            <span style={{ fontSize: '16px'}}>主页</span>
                        </MyNavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="notification" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>提醒</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="share-alt" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>分享</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="calendar" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>日程</span>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Icon type="message" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>消息</span>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Icon type="more" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>更多</span>
                    </Menu.Item>
                    <Menu.Item key="7" onClick={this.GoToSettings}>
                        <Icon type="setting" style={{ fontSize: '18px'}}/>
                        <span style={{ fontSize: '16px'}}>Setting</span>
                    </Menu.Item>
                </Menu>
                <Button type="primary" icon="edit" block onClick={this.handleNew}>New</Button>
            </div>
        )
    }
}