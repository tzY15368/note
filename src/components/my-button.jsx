import React,{Component} from 'react'
import {Button} from "antd";

export default function MyButton(props) {
    return <Button {...props} activeClassName='activeClass'></Button>
}