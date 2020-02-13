import React,{Component} from 'react';
import {encrypt} from '../../utils/encrypts'
export default class MobileMain extends Component {
    render(){
        let str = '123456'
        console.log(encrypt(str))
        return (

            <div>this is mobile main</div>
        )
    }
}