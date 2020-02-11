import React,{Component} from 'react'
import MyMenu from "./menu/menu";
export default class LeftCol extends Component {
    render(){
        return (
            <div>
                <MyMenu ToSettings={this.props.ToSettings}/>
            </div>
        )
    }
}