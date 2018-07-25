import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import axios from 'axios';

import Key from './components/Key';
import styles from './Wework.less';

const URL = 'https://wework2018apis.azure-api.cn';
let AUTH_TOKEN = '';
const params = [
  '26cf02ea-9b1b-4d67-b5f3-bf4b68009bae',
  'f65f483e-4670-471d-877f-a68a8926cdbe',
  '2058c735-3b12-4b68-ad93-37be024e8334',
  '2925a0b7-fa3d-4f18-9415-964e2edce086',
  'c3b1b7df-bf7f-4fff-a667-5237e8f53f41',
  'a176ae45-bffd-491c-b1e2-5a3f3de0c332',
  'c6f4bded-a386-402d-bb1c-553cdaf1afff',
  '01551b2b-e707-4bdf-9445-523454f5cca8',
  '1c02d488-caac-469d-b6f6-68c01d9c109e',
  '09db37f1-266f-4d64-b753-21639faa783a',
  '026d2749-86fa-47a6-bf9b-0553b32038dc',
  '8bbdba2c-0f52-41fd-b882-bbad1d0840e7',
  '99a67174-896a-49ac-9cd4-d6420826769e',
  '082ad927-2389-46bf-8154-960804c5fc62',
  '166f77aa-e53d-4df2-b724-7f2fa7dfb645',
  'f151ca0f-1d5e-4eec-8d85-67763aab7d25',
  'e73c83bc-9ad2-4d48-a731-70c58232a6b3',
  'a145569a-060c-4d1e-9317-5eb2ca3079b4',
  '4ebbf4e2-f3b2-4a8f-b0e7-76e57c28c98c',
  '89954afe-d579-491c-a1d5-cf7e15f7614b',
  '330ed5ec-3bd8-4105-954a-20c863e6f1c6',
  '8a6a244d-cb1c-4d6d-9504-87ae0869dab0',
  'ba02dc3b-f133-42b7-8262-30ad3cf687e9',
  '0a7ae5cb-d815-42c7-9e4c-e4685f3f747e',
  '6b2632b3-2bd4-4627-9f3e-e52fa647ab94',
  '7670690d-2fc3-4975-a8a7-a806924df196',
  'd72754b0-e28c-4b4d-84a7-556d95fd27fb',
  'fa3509df-e1d9-4132-858f-1cffb0ea1c3f',
  '3adde18a-1e03-4edd-9ef7-9606bd816840',
  '148d80b7-b892-4252-8e19-1bb585223808',
  '7bc3c588-08d3-41e6-9564-099324610c7d',
  '24bfb43c-77d3-4471-9b40-974debeeb95e',
  'c61ce1d6-ec78-4016-832b-0e0d12d7d2e8',
  'ba90e6fc-1a20-4100-aa35-77662b4379e1',
  '4993b408-1c8c-41a1-a926-1d238749965e',
  'f456cc04-92da-45ba-8973-319db08aef34',
  '96b1480b-48db-4f1c-a47f-bb1399fe4b98',
  '89dd0fcd-acff-4d9f-aa78-e23361d71a3c',
];

@connect(() => ({}))
export default class WeworkFunPush extends Component {
  constructor(props) {
    super(props);
    const defaultData = [];
    for (let i = 0; i < 67; i++) {
      defaultData.push({
        active: false,
        value: i + 1,
      });
    }
    this.url = this.getUrl();
    this.state = {
      list: defaultData,
    };
  }

  componentDidMount() {
    this.setToken();
    this.interval = setInterval(() => {
      this.fetch();
    }, 4000);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  getUrl() {
    let url = `${URL}/desk/deskStatusInfos?`;
    params.forEach((value, index) => {
      if (value) {
        url = `${url}&deskId=${value}`;
      }
    });
    return url;
  }

  listen(id, stroke, fill, opacity, deskId) {
    const that = this;
    const rect = document
      .getElementById('balphasvgqu')
      .contentDocument.getElementsByTagName('rect');
    for (let i = 0; i < rect.length; i++) {
      if (rect[i].getAttribute('id') == id) {
        // 循环改变颜色
        rect[i].setAttribute('stroke', `${stroke}`);
        rect[i].setAttribute('fill', `${fill}`);
        rect[i].setAttribute('fill-opacity', opacity);
        // 为小方块绑定click事件
        rect[i].onclick = function() {
          that.updateChart(deskId);
          window.location.href = `${window.location.origin}/west/#/analysis2`;
        };
      }
    }
  }

  updateChart(value) {
    this.props.dispatch({ type: 'chart/updateDeskId', payload: value });
  }

  // 0无人  1有人  2离线
  peopleSensor(data) {
    const { humansensor, status } = data.deviceTwin;
    if (status === '离线') {
      return 2;
    }
    return humansensor;
  }

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

  fetch() {
    const that = this;
    axios({
      methods: 'get',
      url: this.url,
      headers: {
        Authorization: AUTH_TOKEN,
        'Ocp-Apim-Trace': true,
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        if (response.status === 200) {
          const all = response.data.data;
          for (let i = 0; i < all.length; i++) {
            let count = 0;
            for (let j = 0; j < all[i].devices.length; j++) {
              if (that.peopleSensor(all[i].devices[j]) === 1) {
                that.listen(all[i].htmlId, '#FA7676', '#F5CECE', 1, all[i].id);
                break;
              }
              if (that.peopleSensor(all[i].devices[j]) === '0') {
                that.listen(all[i].htmlId, '#00A699', '#00A699', 0.2, all[i].id);
              }
              if (that.peopleSensor(all[i].devices[j]) === 2) {
                count++;
                if (count === all[i].devices.length) {
                  that.listen(all[i].htmlId, '#666666', '#cccccc', 1, all[i].id);
                }
              }
            }
          }
        }
      })
      .catch((err, err2) => {
        console.log('======== err ========', err, err2);
        this.setToken();
      });
  }

  render() {
    return (
      <div className={styles.main}>
        <iframe
          src="http://popularize.9-a-m.com/svg/static/beijing.svg"
          // src={require('./img/beijing.svg')}
          width="1024px"
          height="768px"
          id="balphasvgqu"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          scrolling="no"
        />
      </div>
    );
  }
}
