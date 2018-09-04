import React, { Component } from 'react';
import axios from 'axios';
import styles2 from './TianChuang.css';

import Key from './components/Key';
import Line from './components/Line';
import Door from './components/Door';

const styles = {
  center: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  app: {
    width: '1000px',
    height: '1400px',
    display: 'flex',
    // margin: '0 auto',
    marginLeft: '0',
    marginRight: '0',
    flexDirection: 'column',
    alignItems: 'center',
  },
  app2: {
    width: '1000px',
    height: '1400px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    border: '2px solid #d4d4d6',
    marginTop: '40px',
    marginBottom: '40px',
    marginLeft: '20px',
    marginRight: '20px',
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
// const URL = 'https://wework2018apis-dev.azure-api.cn';
const URL = 'http://iotbaseapi-9am.azure-api.cn';
let AUTH_TOKEN = '';
const params = [
  '', // 1
  '', // 2
  '7bfd2ddb-e4d3-45a7-b0ab-405374c1e5f5', // 3
  '', // 4
  '8f941786-720c-4dd9-b68f-a832920d3632', // 5
  '5770b9a9-ab16-4656-baba-c3772742c6da', // 6
  '', // 7
  '5d9f6c21-3bb6-4d60-b62e-8efb47d815ac', // 8
  '596335eb-16f0-4f95-98c1-362cb8d7e402', // 9
  '63189378-3308-4232-a15a-e56c889aed2c', // 10
  '74541e11-f2f5-42b7-a0fc-8a7f3e0874f6', // 11
  '20f47404-8b2a-4c2f-b753-2d582e1140e0', // 12
  'bf7920ec-d590-4146-9135-d1742ef075b6', // 13
  '9b4c229d-e8e3-452f-986a-50486aebc42a', // 14
  'bb71ba9c-3fed-4648-87ed-33ba9fe73c98', // 15
  'a1054952-3158-41cf-9a53-82c09bed5dd2', // 16
  '50fa72eb-54d1-4e42-a0f4-fa03c885df11', // 17
  '881cd1a0-4de4-46a3-8619-bf7aca47ebb9', // 18
  '0f7beab2-333b-4568-83d1-dd9741c0d59d', // 19
  'c1f4ef23-c1a7-4298-9efc-09255fe4e94f', // 20
  '', // 21
  'd39ba0f3-f5c2-47b6-82aa-fb2aac1c3143', // 22
  'c5845b90-d0d5-4134-b3a2-280ea01d88be', // 23
  '22d29993-a76f-4a73-877d-0add144e9cec', // 24
  '6a4692e6-f98f-4201-8612-01e7818893ce', // 25
  'e94e7142-954f-4811-be08-c0a992dc51c1', // 26
  '4b029249-b435-4805-a7b7-32e00da8a1ce', // 27
  '6c5e0f17-fa37-4d6c-9b6a-e24df39f8bc8', // 28
  'd863ee58-f951-4c95-85fe-fc0ffabddbc1', // 29
  '2f5893f6-749f-4661-b172-fcd3faea232f', // 30
  '3e3b1f67-ec82-42b7-8572-281f93be68ee', // 31
  '56c85fa3-aa05-45f2-b57b-08086098701c', // 32
  '75bca2c3-3ab0-4799-a234-5053b46ade47', // 33
  '8db4cf96-c85b-4ac8-972c-daff93d8fa7e', // 34
  'f6daa8c3-a65c-49ca-bd0c-c7463696d608', // 35
  '2729e0c4-fceb-4203-ab7c-34ca1b1f0b18', // 36
  '74b9ce4f-1426-4e7b-98e8-9ddc6a580ed5', // 37
  '63344ab2-a64f-407d-b280-20ea63e94e56', // 38
  '152fb5be-c3e7-40f8-833f-5f87806ae44c', // 39
  '31559176-5f3b-4dce-88dd-6e0bf1a48056', // 40
  '', // 41
  '22054a6e-08b3-4d06-8837-69bdc36c6702', // 42
  '00265848-a60b-4bd5-90b0-65151acb47b2', // 43
  '941402ac-1d8e-4076-bded-ba044450c065', // 44
  '2c2b8b04-da60-40fb-b14b-35c553b22899', // 45
  '7442f19c-e050-4b9c-ad51-0e1ceb20f33b', // 46
  'f9cd1c60-1fe7-4cb2-bbdd-eb3361dafcd9', // 47
  '2e750e00-1fec-45cf-97f3-2f38d5ba0500', // 48
  '8935e21c-4ef1-4266-958a-53fa06aef1ee', // 49
  '', // 50
];

class App extends Component {
  constructor(props) {
    super(props);
    this.defaultData = [];
    for (let i = 0; i < 50; i+=1) {
      this.defaultData.push({ active: false, value: i + 1 });
    }
    this.url = this.getUrl();
    this.state = {
      list: this.defaultData,
    };
  }

  getUrl() {
    let url = `${URL  }/desks/status?`;
    params.forEach((value, index) => {
      if (value) {
        if (index === 2) {
          url = `${url  }deskId=${  value}`;
        } else {
          url = `${url  }&deskId=${  value}`;
        }
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

  setToken() {
    axios({
      method: 'post',
      url: `${URL  }/api/token`,
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
      timeout: 5000,
    })
      .then(response => {
        if (response.data.status === 'success') {
          const data = [];
          const resData = response.data.data;
          for (let i = 0; i < params.length; i++) {
            for (let j = 0; j < resData.length; j++) {
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
      .catch(err => {
        that.setToken();
      });
  }

  updateList(list) {
    this.setState({ list });
  }

  render() {
    const { list } = this.state;
    return (
      <div className={styles2.Center}>
        <div className={styles2.App}>
          <div style={styles.app2}>
            <Key />
            <Door />
            <Line data={list.slice(0, 10)} title="第一排" />
            <Line data={list.slice(10, 20)} title="第二排" />
            <Line data={list.slice(20, 30)} title="第三排" />
            <Line data={list.slice(30, 40)} title="第四排" />
            <Line data={list.slice(40, 50)} title="第五排" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
