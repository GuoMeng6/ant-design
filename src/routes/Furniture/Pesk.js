import React, { Component } from 'react';
import axios from 'axios';
import Item from '../../components/sensor/Item';

const styles = {
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    width: 'auto',
    height: 300,
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    height: 300,
    width: 280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  right: {
    marginLeft: 100,
    height: 300,
    width: 280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#325471',
    fontWeight:500,
  },
}

const URL = process.iotbaseApi;
let AUTH_TOKEN = '';
const params = [
  'f7b735d3-56da-4dc4-8307-6dd7144d56af', // 42
  '2b85f2fc-9d0a-48e7-a482-cdbd50ebe0b2', // 43
  '0fe0a532-0ca0-46d0-8b22-dc264b2defa9', // 44
]

class Pesk extends Component {
  constructor(props) {
    super(props);
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
    }, 2000);
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
    let url = `${URL}/desks/status?`;
    params.forEach((value) => {
      url = `${url}&deskId=${value}`;
    });
    return url;
  }

  updateList(list) {
    this.setState({ list });
  }

  fetch() {
    const that = this;
    axios({
      method: 'get',
      url: this.url,
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Ocp-Apim-Trace': true,
        'Content-type': 'application/x-www-form-urlencoded',
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
                data.push({ value: '' });
                break;
              }
              const devices = resData[j].devices[0];
              if (params[i] === resData[j].id) {
                data.push({
                  ...resData[j],
                  active: (devices && devices.deviceTwin && devices.deviceTwin.humansensor) === 1,
                  value: i + 1,
                  status: devices && devices.deviceTwin && devices.deviceTwin.status,
                });
                break;
              }
              if (j === resData.length - 1 && params[i] !== resData[j].id) {
                data.push({ value: '?', active: false });
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
        that.setToken();
      });
  }


  render() {
    const { list } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.center}>
          <div style={styles.left}>
            <Item data={list[0]} style={{marginTop: 65}} />
            <div style={{flex:1}} />
            <font style={styles.text}>Pesk</font>
          </div>
          <div style={styles.right}>
            <Item data={list[1]} />
            <Item data={list[2]} style={{marginTop: 10}} />
            <div style={{flex:1}} />
            <font style={styles.text}>Twins</font>
          </div>
        </div>
      </div>
    );
  }
}

export default Pesk;
