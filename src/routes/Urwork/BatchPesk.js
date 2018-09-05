import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, css } from 'aphrodite';

import Item from '../../components/sensor/Item';

const URL = process.iotbaseApi;
let AUTH_TOKEN = '';

const itemStyle = {
  itemView1: {
    width: 90,
    height: 60,
    marginLeft: 10,
  },
  itemView2: {
    width: 90,
    height: 60,
  },
}
class BatchPesk extends Component {
  constructor(props) {
    super(props);
    const { params } = props;
    this.defaultData = [];
    for (let i = 0; i < params.length; i+=1) {
      this.defaultData.push({ active: false, value: i + 1, status:'offline' });
    }
    this.url = this.getUrl();
    this.state = {
      list: this.defaultData,
    };
  }

  componentDidMount() {
    this.setToken();
    this.interval = setInterval(() => {
      this.fetch();
    }, 3000);
  }

  componentWillUnmount(){
    this.interval && clearInterval(this.interval);
  }

  setToken() {
    axios({
      method: 'post',
      url: `${URL}/api/token`,
      data: {
        unique_name: '9AM@9amtech.com',
        password: 'Noma4111',
      },
    }).then(response => {
      if (response.data && response.data.status === 'success') {
        AUTH_TOKEN = response.data.data;
      }
    });
  }

  getUrl() {
    const { params } = this.props
    let url = `${URL}/desks/status?`;
    params.forEach((value) => {
      if (value) {
        url = `${url}&deskId=${value}`;
      }
    });
    return url;
  }

  updateList(list) {
    this.setState({ list });
  }

  fetch() {
    const { params } = this.props;
    const that = this;
    axios({
      method: 'get',
      url: this.url,
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Ocp-Apim-Trace': true,
      },
      validateStatus (status) {
        return status >= 200 && status < 500; 
      },
      timeout: 5000,
    })
      .then(response => {
        if (response.data.status === 'success') {
          const data = [];
          const resData = response.data.data;
          for (let i = 0; i < params.length; i+=1) {
            for (let j = 0; j < resData.length; j+=1) {
              if (params[i] === '') {
                data.push({ value: '', active: false, status: 'offline' });
                break;
              }
              const devices = resData[j].devices[0];
              if (params[i] === resData[j].id) {
                data.push({
                  ...resData[j],
                  active: (devices && devices.deviceTwin && devices.deviceTwin.humansensor) === 1,
                  value: i + 1,
                  status: devices && devices.deviceTwin && devices.deviceTwin.status,
                  number:devices.number,
                });
                break;
              }
              if (j === resData.length - 1 && params[i] !== resData[j].id) {
                data.push({ value: '?', active: false, status: 'offline' });
                break;
              }
            }
          }
          that.updateList(data);
        } else {
          that.updateList(that.defaultData);
        }
      })
      .catch(() => {
        this.setState({ list: that.defaultData });
        that.setToken();
      });
  }

  render() {
    const { list } = this.state;
    console.log('****** list ******',list);
    return (
      <div className={css(styles.container)}>
        {[0, 1, 2, 3].map((value) => {
          return (
            <div className={css(styles.rowView)} key={`batch${value}`}>
              {list.slice(value * 10, value * 10 + 10).map((item, index) => (
                <Item
                  key={`item${index+1}`}
                  data={item}
                  showValue
                  style={index === 0 ? itemStyle.itemView2: itemStyle.itemView1}
                />
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  rowView: {
    width: '100%',
    height: 'auto',
    margin: [20, 20, 20, 20],
    display: 'flex',
    flexDirection: 'row',
  },
 
});

export default BatchPesk;
