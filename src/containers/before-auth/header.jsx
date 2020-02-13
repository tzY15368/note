import React,{Component} from 'react'
import { Row, Col } from 'antd';

export default class Header extends Component {
    render(){
        return (
                <Row>
                    <Col xl={16} offset={4}>
                        <div className="page-header">
                            <h2>Leave notes when?</h2>
                        </div>
                    </Col>
                </Row>
        )
    }
}