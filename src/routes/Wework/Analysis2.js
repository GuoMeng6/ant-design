import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, DatePicker, Input } from 'antd';
import moment from 'moment';
import { TimelineChart } from 'components/Charts';
import axios from 'axios';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis2.less';

const URL = process.weworkApi;
let AUTH_TOKEN = '';
const { RangePicker } = DatePicker;
const { Search } = Input;

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangePickerValue: getTimeDistance('year'),
      input: '',
      chartData: [],
    }
    this.from = '';
  }

  componentDidMount() {
    const { chart } = this.props;
    this.setToken();
    this.setState({ input: chart.deskId });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  // 时间改变的事件
  onChange(dates) {
    const from = dates[0];
    const to = dates[1];
    this.from = from;
    this.to = to;
  }

  // 时间组件点击确定时触发的函数
  onOk() { }
  
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

  handleChangeSalesType = () => {};

  handleTabChange = () => {};

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

  // 搜索触发的事件
  handleSearch() {
    const { input } = this.state;
    if (input === '') {
      alert('请输入deskId');
      return;
    }
    let url = `${URL}/data/statusList?deskId=${input}`;
    if (this.from) {
      url = `${URL}/data/statusList?deskId=${input}&startTime=${this.from}&endTime=${
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
        for (let i = 0; i < response.data.data.length; i+=1) {
          all.push({ deviceId: response.data.data[i].deviceId, data: [] });
          let oldHumanSensor = '';
          for (let j = 0; j < response.data.data[i].historyList.length; j+=1) {
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
      .catch(() => {
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
    const {  chartData, input } = this.state;
    const {  loading } = this.props;
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
          value={input}
        />
        <br />
        <br />
        {chartData.map((item, index) => {
          return (
            <div style={{ paddingBottom: 30 }} key={`charaData${index+1}`}>
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
            </div>
          );
        })}
      </Fragment>
    );
  }
}
