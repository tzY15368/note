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
    }
    state = {
        visible:false,
        loading:false
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
                /*<Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="nav-text">nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span className="nav-text">nav 3</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="user" />
                            <span className="nav-text">nav 4</span>
                        </Menu.Item>
                    </Menu>
                </Sider>*/

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
                <div className="list-group" style={{"marginTop":"10px"}}>
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
                            <Icon type="home" />
                            <span>主页</span>
                        </MyNavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="notification" />
                        <span>提醒</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="share-alt" />
                        <span>分享</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="calendar" />
                        <span>日程</span>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Icon type="message" />
                        <span>消息</span>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Icon type="more" />
                        <span>更多</span>
                    </Menu.Item>
                    <Menu.Item key="7" onClick={this.GoToSettings}>
                        <Icon type="setting" />
                        <span>Setting</span>
                    </Menu.Item>
                </Menu>
                <Button type="primary" icon="edit" block onClick={this.handleNew}>New</Button>
            </div>
        )
    }
}