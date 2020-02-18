import React,{Component} from 'react'
import {connect} from "react-redux";
class HeaderMidMainDisp extends Component {
    state = {
        location:this.props.location,
        headerSuffix:'主页'
    };
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('new location:'+nextProps.location);
        this.setState({location:nextProps.location});
        const newLocation = nextProps.location;
        let suffix='主页';
        if(newLocation==='/main/alert'){
            suffix='提醒';
        }
        if(newLocation==='/main/settings'){
            suffix='设置';
        }
        this.setState({headerSuffix:suffix});
    }

    render(){
        console.log('rendering location:'+this.state.location);
        return (
            <div className="panel-heading">
                <h2 className="panel-title mainFont" style={{marginTop:"5px"}}>
                    {this.props.user.username+"的"+this.state.headerSuffix}
                </h2>
            </div>
        )
    }
}
export default connect(
    state =>({user:state.user}),{}
)(HeaderMidMainDisp)