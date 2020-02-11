import { Menu, Icon, Button,Modal } from 'antd';

import React,{Component} from 'react'
import MyNavLink from "../../../../components/my-nav-link";
import MyEditor from "../../../../components/editor";
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
            <div  className="left">
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
                    <MyNavLink to='/main'><h2>Leave notes now</h2></MyNavLink>

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