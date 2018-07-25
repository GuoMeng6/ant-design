import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Tabs, DatePicker, Input } from 'antd';
import moment from 'moment';
import { TimelineChart } from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import axios from 'axios';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis2.less';

const URL = 'https://wework2018apis.azure-api.cn';
const label = {
  offset: 10,
  textStyle: {
    textAlign: 'center',
    fill: '#404040',
    fontSize: '12',
    fontWeight: 'bold',
    rotate: 70,
    textBaseline: 'top',
  },
  autoRotate: true,
};
const scale = {
  sales: {
    type: 'linear',
    min: 0, // 定义数值范围的最小值
    max: 10000, // 定义数值范围的最大值
    ticks: [0, 1], // 用于指定坐标轴上刻度点的文本信息（label），当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
    tickInterval: 1000, // 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，tickCount 和 tickInterval 不可以同时声明。
    tickCount: 2, // 定义坐标轴刻度线的条数，默认为 5
  },
};
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
    chartData: [],
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

  // 获取token
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

  // 时间改变的事件
  onChange(dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    this.from = dates[0];
    this.to = dates[1];
    // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }

  // 时间组件点击确定时触发的函数
  onOk() {
    console.log('========= OK =========', 'From: ', this.from, ', to: ', this.to);
  }

  // 搜索触发的事件
  handleSearch(e) {
    if (this.state.input === '') {
      alert('请输入deskId');
      return;
    }
    let url = `${URL}/data/statusList?deskId=${this.state.input}`;
    if (this.from) {
      url = `${URL}/data/statusList?deskId=${this.state.input}&startTime=${this.from}&endTime=${
        this.to
      }`;
    }
    axios({
      methods: 'get',
      url,
      headers: {
        Authorization: AUTH_TOKEN,
        'Ocp-Apim-Trace': true,
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        const all = [];
        for (let i = 0; i < response.data.data.length; i++) {
          all.push({ deviceId: response.data.data[i].deviceId, data: [] });
          let oldHumanSensor = '';
          for (let j = 0; j < response.data.data[i].historyList.length; j++) {
            const humansensor = Number(response.data.data[i].historyList[j].humansensor);
            const x = moment(response.data.data[i].historyList[j].updatedAt).unix() * 1000;
            if (oldHumanSensor !== humansensor) {
              if (humansensor === 0) {
                all[i].data.push({
                  x: x - 1,
                  y1: 1,
                  index: j,
                  time: moment.unix(x / 1000).format('hh:mm'),
                });
              } else {
                all[i].data.push({
                  x: x - 1,
                  y1: 0,
                  index: j,
                  time: moment.unix(x / 1000).format('hh:mm'),
                });
              }
              all[i].data.push({
                x,
                y1: humansensor,
                index: j,
                a: '=',
                time: moment.unix(x / 1000).format('hh:mm'),
              });
            }
            oldHumanSensor = humansensor;
          }
        }
        this.setState({
          chartData: all,
        });
      })
      .catch((err, err2) => {
        this.setToken();
      });
  }

  // 改变输入框的值
  handleInputChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  // 自定义时间
  obTime(time) {
    const date = new Date(time); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
    const D = date.getDate() < 10 ? `0${date.getDate()} ` : `${date.getDate()} `;
    const h = ` ${date.getHours()}` < 10 ? `0${date.getHours()}:` : `${date.getHours()}:`;
    const m = date.getMinutes() < 10 ? `0${date.getMinutes()}:` : `${date.getMinutes()}:`;
    const s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    return M + D + h + m + s;
  }

  render() {
    const { currentTabKey, chartData, input } = this.state;
    const { chart, loading } = this.props;
    // const { offlineData, offlineChartData } = chart;
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
        {chartData.map((item, index) => {
          return (
            <div style={{ paddingBottom: 30 }} key={`charaData${index}`}>
              <font>传感器id：{item.deviceId}</font>
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
                      y1: '传感器感应状态',
                    }}
                  />
                )}
              </Card>
              {/* <Chart scale={scale} height={350} data={item.data} forceFit>
                <Axis label={label} name="month" />
                <Axis name="value" />
                <Tooltip crosshairs={{ type: 'y' }} />
                <Geom type="line" position="month*value" size={2} shape="hv" />
              </Chart> */}
            </div>
          );
        })}
      </Fragment>
    );
  }
}
