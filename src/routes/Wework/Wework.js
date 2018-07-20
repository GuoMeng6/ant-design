import React, {
  Component
} from 'react';
import {
  connect
} from 'dva';
import {
  Link
} from 'dva/router';
import axios from 'axios';

import Key from './components/Key';
import styles from './Wework.less';

const URL = 'https://wework2018apis.azure-api.cn';
let AUTH_TOKEN = '';
const params = [
'a776ba3b-b342-4913-a0ba-51a632d69689',
'e3e6c7a4-0ef4-41a4-9e1d-9d392e6048d1',
// '39e1aef4-d029-44fe-abaa-878355ec2eb5',
// 'a7eb7c6f-f0c0-4053-9bcf-872ba9d8ecd2',
'0e86bb4e-9ab8-4080-89d1-3a7dbe3290d9',
// '67a610e2-81ad-400a-bb34-1f960644b5dc',
// 'a77c9bde-3136-4e55-b5ad-d5c0bb34b6bb',
// 'c58567b1-047c-475b-bb0a-6bb53e3d986e',
// '844bffe9-4494-4c0d-9a70-ade660718cd6',
// '80e0b387-476e-4d1d-8743-38658fca231f',
// 'c9a17db3-bd41-4fe7-a868-c1db9bf8b40e',
// 'a0c5b170-0fc9-4e3b-af2e-ceee257e6f7d',
// '47bf8396-560e-472b-9b59-4627ae0f148a',
// 'bfb7f415-3e39-4533-8a18-b0126be675e4',
// '591dee25-524d-4f21-b4c9-fe26056d8043',
// 'ed008fad-1f62-4d60-96a8-27b07df4742b',
// 'aa164cb6-1b74-424a-94cc-82cd4879dfba',
// '483c4a43-af53-4729-b35c-4762ed3dcc17',
// 'c3f02bd9-3bb2-43e4-8d20-1b4c56c933dd',
// 'cdb59f88-a9d2-48ef-9dbb-60f5f441428d',
// '70d1a9bc-a029-4a68-a8cb-e7c595b392be',
// '780bcb5c-af6c-4a3e-934c-ac8137230232',
// 'c12bd3ef-7fde-4326-929a-eeb0b522279a',
// 'bcb2b328-6c1f-475b-8b19-73b447c43ce1',
// '39d7d85a-f4b5-4770-b2ff-4c4123ae13ce',
// '340004e6-49ac-46ad-99e4-9dab80648c48',
// '8c782c32-a73f-42d3-81e5-0f0928d615b3',
// '7bc2363c-1440-4ef7-a4f4-8e65938d3fd9',
// '4fd9cf54-476c-4e8f-b034-e77ff0cf3c9b',
// '825dd860-e606-42fe-b988-b1397dea789a',
// '40c546a5-c216-4f66-b537-2e26a0ddbdd7',
// '7b046bab-3972-4485-ab1d-24fbdc1f6a87',
// '22154e60-09c3-4b04-9327-bc0dc4e49d52',
// 'd4741c0b-bed0-4c2f-9527-66e6c6922e08',
// '5c7c2b29-2b22-4a53-adf9-5848a6ae98f1',
// '512fccca-4a65-401c-b340-f37af799a167',
// '371d605c-347e-4a96-9c3a-295295193fbb',
// '411a8f8c-0981-437c-8a2e-a4d8fee5bf5a',
// '0fd5e8e8-f188-4b4d-9e06-9231d2d67f12',
// '3fc31323-045c-42a8-bd6e-6a1cf310b1cb',
// '097badae-2c31-458e-8a6e-271354516f5e',
// '7b6f5cb5-f182-40f3-a7e0-cfd51201d6f9',
// '3894dae0-5820-4baf-af41-f544534d105d',
// '06bf14ff-5f2a-46f8-89ec-70579768ef51',
// 'f9e27fbf-b560-45b6-860b-6ffe0354b8a4',
// '888f684c-dd2a-4494-bb37-c1c7d5ea1081',
// '6c82a57b-11db-4425-8589-58a8af5c0783',
// '86b4ec00-d139-4677-9fda-c5c6a83ec3df',
// 'b8a484ad-0752-430d-98ff-c1f55b240f81',
// '0fb64eec-0ff3-4221-9d65-e49a64797524',
// 'c115eae1-dd49-4462-a17f-c00946389012',
// '7f76cedf-48d7-4b2a-b662-0fedd1f0fa85',
// '5a663bdd-8ade-4757-9a3f-40df2d0bdd34',
// 'b76a3315-ed9a-4209-a74f-851c380e7ecf',
// 'a460763a-0bae-4b04-ac1e-f26c94376da8',
// '77c9035b-71f0-43f7-92d1-d7014f42e426',
// 'c6dee55e-c1cf-4b58-969c-5fc04ed6dcda',
// '9a19c2e4-4589-4936-a23b-a10fb6ed1ad3',
// '514520cd-f229-46b2-9fae-b5b754e342f5',
// '6ca0f88e-d248-4b54-885a-8b08cd0620e0',
// '9dd669fc-fe78-40fe-a13f-47bea71d68d4',
// '68cca472-d2e5-425d-976a-1f91c7a8e171',
// '10538c01-b4c4-47a7-bb1e-d10f4b814479',
// '878d0fa1-8c1e-4a3a-8b2b-b883f8356552',
// '9a55171a-be1c-422a-9317-87a3049910e1',
// '5370fe87-1bcc-4b23-86df-4a1de2d7bffe',
// 'f3aacc00-2378-45bc-9bb8-177f09ddaa7a',
// 'c051b204-fe5b-421d-88a4-540ffcefa3c8',
// 'd8e1d75d-80ee-475d-be63-1fb1f822a2a5',
// '8ab82e09-a71e-4fd7-ae6d-45e5cd9d8830',
// 'f82f0f41-22f2-4f42-bf07-4d53b5c3da51',
// 'e2e6db28-4d83-470b-a5dc-6bbbe10d1467',
// 'd4998bf6-edfb-4931-9c7c-24afa1340c54',
// 'b790b24d-36b5-4f2a-865c-228b4a43d8f3',
// 'b361cb30-a97e-4784-908b-cde60c50f9da',
// '470f6893-fce2-4773-8ed8-521413937110',
// 'f88ff69b-ecc9-4a6b-8365-a68f0bc3a92c',
// '89150dfb-72ff-475c-82ce-6f3417e65fc4',
// 'd6bf26dc-8546-4341-ae04-4a435ecb685a',
// '36b2f836-654c-4369-b921-c5c8ab6ab49d',
// 'a9df3ccb-f496-4f53-92a4-92b1760bba69',
// 'ca21b64e-2ba8-4d24-90b5-fa2c5b451c93',
// '8008c373-58c1-483d-a33a-dfe1ab028871',
// 'a3432db8-ed97-44ce-b87a-a13eeb6019c9',
// '15a02a35-27c5-4f21-aafe-d3b46ab14fda',
// 'dac0a3a3-3ff7-4732-b94f-c95a6e796a3b',
// '0ee7eb05-133c-43d9-bd9c-dc55bd06bef2',
// '4a6709b7-f5dd-4174-8010-0c746f7842fd',
// '8c3f0b62-7894-4dc5-86f1-162f0a939bcd',
// '521f8cd7-0b72-43df-b195-a0eff663f0ad',
// '0d782c4e-75c3-40f1-96ab-b39e8c2d09ee',
// 'a55b1848-f4f8-4d2b-8865-a041addded99',
// 'b699115a-adc9-471b-a43b-8fa069fcfc7a',
// '135f866b-f0b1-4521-97c6-ee26b2cb7139',

];

@connect(() => ({}))
export default class Wework extends Component {
  constructor(props) {
    super(props);
    const defaultData = [];
    for (let i = 0; i < 67; i++) {
      defaultData.push({
        active: false,
        value: i + 1
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
    }, 400000);
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

  listen(id,stroke,fill){
    let rect=document.getElementById('alphasvg').contentDocument.getElementsByTagName('rect');
    for(let i=0;i<rect.length;i++){
      console.log(rect[i].getAttribute('id'));
      console.log(id);
      if(rect[i].getAttribute('id')==id){
        console.log(rect[i]);
        rect[i].setAttribute('stroke',`${stroke}`);
        rect[i].setAttribute('fill',`${fill}`);
      }
    }
  }
  //0无人  1有人  2离线
  peopleSensor(data){
    const {humansensor,status} = data.deviceTwin;
    if(status === '离线'){ 
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
        this.fetch();
      }
    });
  }

  fetch() {
    let that=this;
    axios({
      methods: 'get',
      url: this.url,
      headers: {
        Authorization: AUTH_TOKEN,
        'Ocp-Apim-Trace': true,
        'Content-type': 'application/x-www-form-urlencoded',
      },
    }).then(response => {
      if (response.status === 200) {
        let all=response.data.data;
        for(let i=0;i<all.length;i++){
          let count = 0;
          for(let j=0;j<all[i]['devices'].length;j++){
            if(that.peopleSensor(all[i]['devices'][j]) === 1){
              that.listen(`${all[i].htmlId}`,'#f00','#f00');
              return;
            }
            if(that.peopleSensor(all[i]['devices'][j]) === 0){
              that.listen(`${all[i].htmlId}`,'#0f0','#0f0');
            }
            if(that.peopleSensor(all[i]['devices'][j]) === 2){
              count ++;
              if(count === all[i]['devices'].length){
                that.listen(`${all[i].htmlId}`,'#f2f2f2','#f2f2f2');
              }
            }

            // if(all[i]['devices'][j]['deviceTwin']['humansensor']===1){
            //   that.listen(`${all[i].htmlId}`,'#000000','#000000');

            // }else if(all[i]['devices'][j]['deviceTwin']['humansensor']===0){
            //   console.log('000000000000000000000000000000000');
            //   document.getElementById(`#${all[i].htmlId}`).setAttribute('stroke','#F39C9C');
            //   document.getElementById(`#${all[i].htmlId}`).setAttribute('fill','#FFD6D6');
            // }else if(all[i]['devices'][j]['deviceTwin']['status']==='离线'){
            //   console.log('离线离线离线离线离线离线离线离线离线');
            //   document.getElementById(`#${all[i].htmlId}`).setAttribute('stroke','#F2F2F2');
            //   document.getElementById(`#${all[i].htmlId}`).setAttribute('fill','#F2F2F2');
            // }
          }


        }
      }
    }).catch((err, err2) => {
      // console.log('======== err ========', err, err2);
      // this.setToken();
    });
  }

  render() {
    return ( 
      <div className = {styles.main}>
        <iframe src = {require("./img/nanjingroot.svg")}
          width = "1024px"
          height = "768px"
          id = "alphasvg"
          frameborder = "0"
          marginheight = "0"
          marginwidth = "0"
          scrolling = "no"></iframe> 
      </div>
    );
  }
}
