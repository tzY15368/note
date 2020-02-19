import React,{Component} from 'react'
import {Row,Col,Icon,Button,Menu, Dropdown} from 'antd'
import {hashHistory} from "react-router-dom";
import MyNavLink from "../../../../../../components/my-nav-link";
export default class MobileNav extends Component {
    state = {
        selection:['red','#08c','#08c','#08c'],
    };
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.location!=='/main/front'&&nextProps.location!=='/main/alert'&&nextProps.location!=='/main/search'){
            let newSelection = ['#08c','#08c','#08c','red'];
            this.setState({selection:newSelection});
        }
    }

    handleClick = (targetUrl,index)=>{
        console.log(index+'------------')
        let newSelection = ['#08c','#08c','#08c','#08c'];
        for(let i in this.state.selection){
            console.log(i);
            if(parseInt(i)===index){newSelection[i] = 'red';break;}
        }
        this.setState({
           selection:newSelection
        })//set color
        this.props.handleRedirect(targetUrl)
    };
    handleMore = (targetUrl)=>{
        this.props.handleRedirect(targetUrl)
    }
    render(){
        return (
            <Row type="flex" style={{}} className="mobile-nav-bar">
                <Col md={0} xs={6} sm={6}>
                    <Col md={0} xs={{span:8,offset:8}}>
                        <div className="col-div">
                            <Button type="link" onClick={this.handleClick.bind(this,'/main/front',0)}>
                                <Icon type="home" style={{ fontSize: '20px',color: this.state.selection[0]}}/>
                            </Button>
                        </div>
                    </Col>
                </Col>
                <Col md={0} xs={6} sm={6}>
                    <Col md={0} xs={{span:8,offset:8}}>
                        <div className="col-div">
                            <Button type="link" onClick={this.handleClick.bind(this,'/main/alert',1)}>
                                <Icon type="notification" style={{ fontSize: '20px',color: this.state.selection[1]}}/>
                            </Button>
                        </div>
                    </Col>
                </Col>
                <Col md={0} xs={6} sm={6}>
                    <Col md={0} xs={{span:8,offset:8}}>
                        <div className="col-div">
                            <Button type="link" onClick={this.handleClick.bind(this,'/main/search',2)}>
                                <Icon type="search" style={{ fontSize: '20px',color: this.state.selection[2]}}/>
                            </Button>
                        </div>
                    </Col>
                </Col>
                <Col md={0} xs={6} sm={6} >
                    <Col md={0} xs={{span:8,offset:6}}>
                        <div className="col-div">
                            <Button type="link" onClick={this.props.toggleSideMenu}>
                                <Icon type="more" style={{ fontSize: '20px',color: this.state.selection[3]}}/>
                            </Button>
                        </div>
                    </Col>
                </Col>
            </Row>
        )
    }
}