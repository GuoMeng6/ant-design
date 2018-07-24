import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Tabs, DatePicker, Input } from 'antd';
import moment from 'moment';
import { TimelineChart } from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis2.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const Search = Input.Search;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

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
      { x: 1532400604 * 1000, y1: 0 },
      { x: 1532400804 * 1000, y1: 1 },
      { x: 1532401104 * 1000, y1: 0 },
      { x: 1532403304 * 1000, y1: 1 },
      { x: 1532404404 * 1000, y1: 1 },
      { x: 1532405504 * 1000, y1: 0 },
      { x: 1532406604 * 1000, y1: 1 },
    ],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetch',
    });
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

  onChange(dates, dateStrings) {
    console.log('From: ', dates[0].unix(), ', to: ', dates[1].unix());
    this.from = dates[0].unix();
    this.to = dates[1].unix();
    // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }

  onOk() {
    console.log('========= OK =========', 'From: ', this.from, ', to: ', this.to);
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
          onSearch={value => console.log(value)}
          enterButton
          value={input}
        />
        <br />
        <br />

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
              data={chartData}
              titleMap={{
                y1: '传感器感应状态',
                y2: '传感器感应状态2',
                y3: '传感器感应状态3',
                y4: '传感器感应状态4',
              }}
            />
          )}
        </Card>
      </Fragment>
    );
  }
}
