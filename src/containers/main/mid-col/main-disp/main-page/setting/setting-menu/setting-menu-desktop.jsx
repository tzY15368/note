import React,{Component} from 'react'
import {Icon, Menu} from "antd";
import {NavLink} from "react-router-dom";

const { SubMenu } = Menu;
export default class SettingMenuDesktop extends Component {
    render(){
        return (
            <Menu
                onClick={this.handleClick}
                /*style={{width: "30%"}}*/
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                                <Icon type="appstore"/>
                            <span><NavLink to='/main/settings/profile'>资料</NavLink></span>
                            </span>
                    }
                >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                        <span>
                                <Icon type="setting"/>
                            <span><NavLink to='/main/settings/security'>安全</NavLink></span>
                            </span>
                    }
                >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub5"
                    title={
                        <span>
                                <Icon type="setting"/>
                                <span><NavLink to='/main/settings/privacy'>隐私</NavLink></span>
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