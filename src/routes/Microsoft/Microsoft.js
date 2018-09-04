import React, { Component } from 'react';
import axios from 'axios';
import styles2 from './Microsoft.css';
import Key from './components/Key';
import PeskView from './components/PeskView';
import PeskView2 from './components/PeskView2';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  peskView: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
  },
};
let AUTH_TOKEN = '';
// const URL = 'https://wework2018apis-dev.azure-api.cn';
const URL = 'http://iotbaseapi-9am.azure-api.cn';
const params = [
  '8392915e-e3fc-4d9a-ad3f-3d60a72bf8a2', // 微软
  // '5ee6ad20-fa29-4e71-9021-376a0da49e56', //测试1 原先的pesk15
  // '31559176-5f3b-4dce-88dd-6e0bf1a48056', //测试2
];

class App extends Component {
  constructor(props) {
    super(props);
    const defaultData = [];
    for (let i = 0; i < 1; i++) {
      defaultData.push({ active: false, value: i + 1 });
    }
    this.url = this.getUrl();
    this.state = {
      list: defaultData,
    };
  }

  setToken() {
    axios({
      method: 'post',
      url: `${URL  }/api/token`,
      data: {
        unique_name: 'microsoft@9amtech.com',
        password: 'Saga8798',
      },
    }).then(response => {
      if (response.data && response.data.status === 'success') {
        AUTH_TOKEN = response.data.data;
      }
    });
  }

  getUrl() {
    let url = `${URL  }/desks/status?`;
    params.forEach((value, index) => {
      if (index === 0) {
        url = `${url  }deskId=${  value}`;
      } else {
        url = `${url  }&deskId=${  value}`;
      }
    });
    return url;
  }

  componentDidMount() {
    this.setToken();
    this.interval = setInterval(() => {
      this.fetch();
    }, 2000);
  }

  fetch() {
    const that = this;
    axios({
      method: 'get',
      url: this.url,
      headers: {
        Authorization: `Bearer ${  AUTH_TOKEN}`,
        'Ocp-Apim-Trace': true,
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        if (response.status === 200) {
          const data = [];
          const resData = response.data.data;
          for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 1; j++) {
              const devices = resData[j].devices[0];
              if (params[i] === resData[j].id) {
                data.push({
                  ...resData[j],
                  active: (devices && devices.deviceTwin && devices.deviceTwin.humansensor) === 1,
                  value: i + 1,
                });
                break;
              }
            }
          }
          that.updateList(data);
        } else {
          that.updateList(that.defaultData);
        }
      })
      .catch(() => {});
  }

  updateList(list) {
    this.setState({ list });
  }

  onClick(height) {
    axios({
      method: 'put',
      url: `${URL  }/desk/deskHeight`,
      data: {
        operateUserId: '234hsdfsdef34538f7',
        deskId: params[0],
        height,
      },
    })
      .then(res => {})
      .catch((err, data) => {
        // console.log('======== err =======', { err, data });
        if (err && err.response && err.response.status === 400) {
          alert('硬件连接异常');
          return;
        }
        if (err && err.response && err.response.data && err.response.data.status === 'fail' && err.response.data.data) {
          alert(err.response.data.data.message);
          return;
        }
        alert(err.response.data.message);
      });
  }

  setLockStatus(status) {
    axios({
      method: 'put',
      url: 'http://wework2018apis-dev.azure-api.cn/desk/deskLockStatus',
      data: {
        operateUserId: '234hsdfsdef34538f7',
        deskId: params[0],
        locked: status,
      },
    })
      .then(res => {
        const data = res.data.data;
        if (data.status === 'fail') {
          alert('设置失败');
        }
      })
      .catch((err, data) => {
        if (err && err.response && err.response.status === 400) {
          alert('硬件连接异常');
          return;
        }
        if (err && err.response && err.response.data && err.response.data.status === 'fail' && err.response.data.data) {
          alert(err.response.data.data.message);
          return;
        }
        alert(err.response.data.message);
      });
  }

  onChange(value) {
    switch (value.target.value) {
      case '1':
        this.onClick(110);
        break;
      case '2':
        this.onClick(75);
        break;
      case '3':
        const data = this.state.list[0];
        this.setLockStatus(data.locked === 'on' ? 'off' : 'on');
        break;
      default:
        break;
    }
  }

  render() {
    const { list } = this.state;
    return (
      <div className={styles2.App}>
        <div style={styles.container}>
          <div style={styles.top}>
            <Key />
          </div>
          <div style={styles.peskView}>
            <PeskView2 data={list[0]} title="MTC" onChange={this.onChange.bind(this)} />
            <div style={{ width: '100px' }} />
            <PeskView data={{ active: false }} title="USA" />
          </div>
          <font style={{ fontSize: 14, color: '#a5a6ab', marginBottom: 40, fontWeight: 200 }}>
            9AM x Microsoft Azure Standing Desk and Smart Workspace Solution
          </font>
        </div>
      </div>
    );
  }
}

export default App;
