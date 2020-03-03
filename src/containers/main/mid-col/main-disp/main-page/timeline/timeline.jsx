import React,{Component} from 'react'
import {Button,Radio,DatePicker,Col,Carousel} from "antd";
import MyDisplayer from "../../../../../../components/displayer";
import './timeline.css'
import axios from 'axios'
import BASEURL from "../../../../../../configs/names";
import cookie from 'react-cookies'
import {ErrorMsg} from "../../../../../../components/notifications";
export default class MyTimeLine extends Component {
    state = {
        size:'zero',
        datePicked:'',
        datePickerBackgroundColor:'',
        listData:[],
        loading:false
    };
    componentDidMount = ()=> {
        let date = new Date();
        let d = new Date(date.toLocaleDateString());
        let start = d.getTime()/1000;
        let end = start + 86400;
        this.fetchTimeline(start,end);

    };

    fetchTimeline = (start,end) =>{
        console.log('starting axios to fetch timeline: start:'+start+' end:'+end);
        this.setState({loading:true});
        const url = BASEURL +'/timeline';
        const token = cookie.load('token');
        if(token!==undefined){
            axios.get(url,{
                params:{start:start,end:end},
                headers:{Authorization:token}
            }).then((res)=>{
                if(res.data.success===1){
                    this.setState({
                        listData:res.data.data
                    });
                } else {
                    console.log(res.data.data);
                    ErrorMsg(res.data.data)
                }
                this.setState({loading:false});
            }).catch((err)=>{
                console.log(err);
                ErrorMsg('网络错误：'+err);
                this.setState({loading:false});
            })
        }
    };
    handleSizeChange = e => {
        this.setState({ size: e.target.value,datePickerBackgroundColor:'white' });
    };
    handleDatePick = (date,dateString)=>{
        console.log(date,dateString);
        let myDate = new Date(dateString);
        let start = myDate.getTime()/1000;
        let end = start +86400;
        this.fetchTimeline(start,end);
        this.setState({datePicked:dateString,size:'three',datePickerBackgroundColor:'#1890FF',listData:[]});
        this.slider.innerSlider.slickGoTo(3)
    };
    onCarouselChange = (a) =>{
        const sizes = ['zero','one','two','three'];
        this.setState({size:sizes[a],listData:[]});

    };
    handleRadioClick = (target)=>{
        let date = new Date();
        let d = new Date(date.toLocaleDateString());
        let start = (d.getTime()/1000)+target*86400;
        let end = start + 86400;
        this.fetchTimeline(start,end);
        this.slider.innerSlider.slickGoTo(target)
    };
    render(){
        const emptyIcon = (
            <div/>
        );
        const {datePickerBackgroundColor,loading} = this.state;
        return (
            <div>
                <Col md={{span:22,offset:1}} sm={0} xs={0} style={{marginTop:10}}>
                        <Radio.Group value={this.state.size} onChange={this.handleSizeChange} size={{marginTop:0}}>
                            <Radio.Button value="zero" onClick={this.handleRadioClick.bind(this,0)}>今天</Radio.Button>
                            <Radio.Button value="one" onClick={this.handleRadioClick.bind(this,1)}>明天</Radio.Button>
                            <Radio.Button value="two" onClick={this.handleRadioClick.bind(this,2)}>后天</Radio.Button>
                        </Radio.Group>
                        <DatePicker
                            onChange={this.handleDatePick}
                            style={{width:100,background:datePickerBackgroundColor}}
                            placeholder={'其他'}
                            allowClear
                            suffixIcon={emptyIcon}
                        />
                </Col>
                <Col md={{span:22,offset:1}} sm={0} xs={0} style={{marginTop:10}}>
                    <Carousel afterChange={this.onCarouselChange} ref={el => (this.slider = el)} dots={false}>
                        <div>
                            <MyDisplayer newListData = {this.state.listData} loadingState = {loading}/>
                        </div>
                        <div>
                            <MyDisplayer newListData = {this.state.listData} loadingState = {loading}/>
                        </div>
                        <div>
                            <MyDisplayer newListData = {this.state.listData} loadingState = {loading}/>
                        </div>
                        <div>
                            <MyDisplayer newListData = {this.state.listData} loadingState = {loading}/>
                        </div>
                    </Carousel>
                </Col>
            </div>
        )
    }
}