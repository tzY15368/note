import React,{Component} from 'react'
import {Icon, Menu} from "antd";
import {NavLink} from "react-router-dom";

const { SubMenu } = Menu;
export default class SettingMenuDesktop extends Component {
    handleClick = t =>{
        this.props.handleRedirect(t)
    };
    render(){
        return (
            <Menu
                /*style={{width: "30%"}}*/
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="profile"/>
                            <span>资料</span>
                        </span>
                    }
                >
                    <Menu.Item key="5" onClick={this.handleClick.bind(this,'/main/settings/profile/amend')}><Icon type="edit"/>修改资料</Menu.Item>
                    {/*<Menu.Item key="6">Option 6</Menu.Item>*/}
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                        <span>
                            <Icon type="safety"/>
                            <span>安全</span>
                        </span>
                    }
                >
                    <SubMenu key="sub9" title={<span><Icon type="user"/><span>账号管理</span></span>}>
                        <Menu.Item key="7" onClick={this.handleClick.bind(this,'/main/settings/security/amend')}><Icon type="key"/>更改密码</Menu.Item>
                        <Menu.Item key="8" onClick={this.handleClick.bind(this,'/main/settings/security/rm')}><Icon type="delete" style={{color: 'red'}}/>删除账号</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="10" onClick={this.handleClick.bind(this,'/main/settings/security/history')}><Icon type="history"/>登陆记录</Menu.Item>
                    <Menu.Item key="11" onClick={this.handleClick.bind(this,'/main/settings/security/keys')}><Icon type="lock"/>密钥管理</Menu.Item>
                    <Menu.Item key="12" onClick={this.handleClick.bind(this,'/main/settings/security/logout')}><Icon type="logout"/>登出</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub5"
                    title={
                        <span>
                                <Icon type="eye"/>
                                <span>隐私</span>
                            </span>
                    }
                >
                    <Menu.Item key="13">Option 9</Menu.Item>
                    <Menu.Item key="14">Option 10</Menu.Item>
                    <Menu.Item key="15">Option 11</Menu.Item>
                    <Menu.Item key="16">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}