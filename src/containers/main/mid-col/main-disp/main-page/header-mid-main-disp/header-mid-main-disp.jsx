import React,{Component} from 'react'
import {connect} from "react-redux";
class HeaderMidMainDisp extends Component {
    render(){
        return (
            <div className="panel-heading">
                <h2 className="panel-title mainFont" style={{marginTop:"5px"}}>
                    {this.props.user.username+"的"}主页
                </h2>
            </div>
        )
    }
}
export default connect(
    state =>({user:state.user}),{}
)(HeaderMidMainDisp)