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
  'c3b1b7df-bf7f-4fff-a667-5237e8f53f41', // 105
  'a176ae45-bffd-491c-b1e2-5a3f3de0c332',
  'c6f4bded-a386-402d-bb1c-553cdaf1afff',
  '01551b2b-e707-4bdf-9445-523454f5cca8',
  '1c02d488-caac-469d-b6f6-68c01d9c109e',
  '09db37f1-266f-4d64-b753-21639faa783a', // 110
  '026d2749-86fa-47a6-bf9b-0553b32038dc',
  '8bbdba2c-0f52-41fd-b882-bbad1d0840e7',
  '99a67174-896a-49ac-9cd4-d6420826769e',
  '082ad927-2389-46bf-8154-960804c5fc62',
  '166f77aa-e53d-4df2-b724-7f2fa7dfb645', // 115
  'f151ca0f-1d5e-4eec-8d85-67763aab7d25',
  'e73c83bc-9ad2-4d48-a731-70c58232a6b3',
  'a145569a-060c-4d1e-9317-5eb2ca3079b4',
  '4ebbf4e2-f3b2-4a8f-b0e7-76e57c28c98c',
  '89954afe-d579-491c-a1d5-cf7e15f7614b', // 120
  '330ed5ec-3bd8-4105-954a-20c863e6f1c6',
  '8a6a244d-cb1c-4d6d-9504-87ae0869dab0',
  'ba02dc3b-f133-42b7-8262-30ad3cf687e9',
  '0a7ae5cb-d815-42c7-9e4c-e4685f3f747e',
  '6b2632b3-2bd4-4627-9f3e-e52fa647ab94', // 125
  '7670690d-2fc3-4975-a8a7-a806924df196',
  'd72754b0-e28c-4b4d-84a7-556d95fd27fb',
  'fa3509df-e1d9-4132-858f-1cffb0ea1c3f',
  '3adde18a-1e03-4edd-9ef7-9606bd816840',
  '148d80b7-b892-4252-8e19-1bb585223808', // 130
  '7bc3c588-08d3-41e6-9564-099324610c7d',
  '24bfb43c-77d3-4471-9b40-974debeeb95e',
  'c61ce1d6-ec78-4016-832b-0e0d12d7d2e8',
  'ba90e6fc-1a20-4100-aa35-77662b4379e1',
  '96b1480b-48db-4f1c-a47f-bb1399fe4b98', // 135
  '4993b408-1c8c-41a1-a926-1d238749965e',
  'f456cc04-92da-45ba-8973-319db08aef34',
  '89dd0fcd-acff-4d9f-aa78-e23361d71a3c',
  '21e221cb-c46d-40d8-a128-144124785053',
  'ed82dc43-8c2a-48af-8440-c00bf51694a6', // 140
  'dbc8e7f2-c42d-41e6-b551-6d5e2dbad315',
  '5cf2a86e-6a4c-4619-b71c-ae42a161858b',
  '4460dadc-2338-4372-b21b-ae4efa842dd8',
  '28b57a44-474c-4dbb-9c25-74ba3dec2403',
  '0eb2d0ca-b862-48cc-832c-28ad51c4c6cb', // 145
  '4dd28453-210b-4fa1-8b7a-eb758ec573a7',
  'd8021686-bf5d-4720-a5ce-68309969d173',
  '5d51f457-a1b0-4a68-96b4-9d1be0647ea8',
  '2ab9717a-478c-43cc-b844-14a7541301a9',
  '58921784-c1e5-4efc-b5b8-4cc3873a39c5', // 150
  'd010bd2c-eb62-4dab-be32-9de0065f3bd2',
  'f7b735d3-56da-4dc4-8307-6dd7144d56af',
  '2b85f2fc-9d0a-48e7-a482-cdbd50ebe0b2',
  '0fe0a532-0ca0-46d0-8b22-dc264b2defa9',
  '340b84d1-b8e2-4ae8-a355-1b420f741c9f', // 155
  '3cd724a4-a55c-41d1-a524-46d7236c52b7',
  '72541b69-dca1-44bb-bae3-42e6e6bc32d0',
  '1d3f77ee-5a0e-45a0-8a3b-f993eef1dad8',
  '9122757b-36ff-49cc-a679-75995556ad84',
  'e519d2c9-2c33-49b0-928b-7f7b95cc2b6a', // 160
  'ae2afbc5-22d9-4732-b9e0-5f84802183eb',
  'a523e71b-667d-4fd6-8709-cce64179c30d',
  '1b2798e1-c60c-411a-a4e4-1b88767435b1',
  'cf5e87fe-10cd-44a4-bd78-d818023dd51c',
  '422cfc80-4be9-4622-9352-048b00c10fc5', // 165
  '3762b2f0-2377-4efe-a5bb-279c5f2ea17a',
  '1388db96-0162-4062-8188-8afae7fe56c1',
];

@connect(() => ({}))
export default class Weworkfun extends Component {
  constructor(props) {
    super(props);
    const defaultData = [];
    for (let i = 0; i < 67; i++) {
      defaultData.push({ active: false, value: i + 1 });
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

  getUrl() {
    let url = `${URL}/desk/deskStatus?`;
    params.forEach((value, index) => {
      if (value) {
        url = `${url}&deskId=${value}`;
      }
    });
    return url;
  }

  setToken() {
    axios({
      methods: 'get',
      url: `${URL}/reservation/getSource`,
    }).then(response => {
      if (response.status === 200) {
        AUTH_TOKEN = response.data.data;
        this.fetch();
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
          const data = [];
          const resData = response.data.data;
          for (let i = 0; i < params.length; i++) {
            for (let j = 0; j < resData.length; j++) {
              if (params[i] === '') {
                data.push({ value: '' });
                break;
              }
              if (params[i] === resData[j].deskId) {
                data.push({
                  ...resData[j],
                  active: !!(resData[j] && resData[j].humanSensor === 1),
                  value: i + 151,
                });
                break;
              }
            }
          }
          // console.log('========= data ======= ', data);
          that.updateList(data);
        } else {
          that.updateList(that.defaultData);
        }
      })
      .catch((err, err2) => {
        // console.log('======== err ========', err, err2);
        that.setToken();
      });
  }

  updateList(list) {
    this.setState({ list });
  }

  render() {
    console.log('======= list ====== ', this.state.list);

    return (
      <div className={styles.main}>
        <iframe src={require("./img/beijingroot.svg")} width="1024px" height="768px" id="alphasvg"
        frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe>
      </div>
    );
  }
}
