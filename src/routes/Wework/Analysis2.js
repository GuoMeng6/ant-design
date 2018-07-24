import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Tabs, DatePicker, Input } from 'antd';
import moment from 'moment';
import { TimelineChart } from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';
import axios from 'axios';

import styles from './Analysis2.less';
const URL = 'https://wework2018apis.azure-api.cn';
let AUTH_TOKEN = '';
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const Search = Input.Search;

const rankingListData = [];

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis2 extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    input: '',
    chartData: [
      {
        'deviceId':'290d7e585f0e426aa644be764846e02b',
        'data':[
          {'x': 1532395830000, 'y1': 1},{'x': 1532395848000, 'y1': 0},{'x': 1532395859000, 'y1': 1}
        ]
      }
    ]
  };

  componentDidMount() {
    const { dispatch, chart } = this.props;
    this.setToken();
    console.log(' ********* Analysis ******** ', chart);
    this.setState({ input: chart.deskId });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }
  //获取token
  setToken() {
    axios({
      methods: 'get',
      url: `${URL}/reservation/getSource`,
    }).then(response => {
      if (response.status === 200) {
        AUTH_TOKEN = response.data.data;
      }
    });
  }
  //时间改变的事件
  onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    this.from = dates[0];
    this.to = dates[1];
    // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }
  //时间组件点击确定时触发的函数
  onOk() {
    console.log('========= OK =========', 'From: ', this.from, ', to: ', this.to);
  }
  //搜索触发的事件
  handleSearch(e) {
    if(this.state.input===''){
      alert('请输入deskId');
      return
    }
    let url=`${URL}/data/statusList?deskId=${this.state.input}`;
    if(this.from){
      url= `${URL}/data/statusList?deskId=${this.state.input}&startTime=${this.from}&endTime=${this.to}`
    }
    axios({
      methods: 'get',
      url: url,
      headers: {
        Authorization: AUTH_TOKEN,
        'Ocp-Apim-Trace': true,
        'Content-type': 'application/x-www-form-urlencoded',
      },
    }).then(response => {
      let all=[];
      for(let i=0;i<response.data.data.length;i++){
        all.push({'deviceId':response.data.data[i].deviceId,'data':[]});
        for(let j=0;j<response.data.data[i].historyList.length;j++){
          all[i].data.push({'x':moment(response.data.data[i].historyList[j].updatedAt).unix() * 1000,'y1':Number(response.data.data[i].historyList[j].humansensor)});
        }
      }
      this.setState({
        chartData: all,
      });
    }).catch((err, err2) => {
      this.setToken();
    });
  }
  //改变输入框的值
  handleInputChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  render() {
    const { currentTabKey, chartData, input } = this.state;
    const { chart, loading } = this.props;
    // const { offlineData, offlineChartData } = chart;
    // console.log('============ render ========== ', { offlineData, offlineChartData });
    // const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    return (
      <Fragment>
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment(), moment().endOf('month')],
          }}
          showTime
          format="YYYY/MM/DD HH:mm:ss"
          onChange={this.onChange.bind(this)}
          onOk={this.onOk.bind(this)}
        />
        <br />
        <br />
        <Search
          placeholder="deskId"
          onChange={this.handleInputChange.bind(this)}
          onSearch={this.handleSearch.bind(this)}
          enterButton
          value={this.state.input}
        />
        <br />
        <br />
        {
          chartData.map((item)=>{
            return (
              <div>
                <font>传感器id</font>
                <Card
                  loading={loading}
                  className={styles.offlineCard}
                  bordered={false}
                  bodyStyle={{ padding: '0 0 32px 0' }}
                  style={{ marginTop: 10 }}
                >
                  {chartData.length === 0 ? null : (
                    <TimelineChart
                      height={200}
                      data={item.data}
                      titleMap={{
                        y1: '传感器感应状态'
                      }}
                    />
                  )}
                </Card>
              </div>
            )
          })
        }
        
      </Fragment>
    );
  }
}
