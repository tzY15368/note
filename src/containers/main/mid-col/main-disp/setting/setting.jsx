import React,{Component} from 'react'
import {connect} from 'react-redux'
class Settings extends Component {
    componentDidMount() {
        console.log(this.props.user)
    }

    render(){
        return (
            <div>

                this is settings
            </div>
        )
    }
}

export default connect(
    state =>({user:state.user}),{}
)(Settings)