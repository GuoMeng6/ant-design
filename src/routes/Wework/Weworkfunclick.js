import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Modal} from 'antd';
import { Input } from 'antd';
import axios from 'axios';
import styles from './Wework.less';


const URL = 'https://wework2018apis.azure-api.cn';
let AUTH_TOKEN = '';
let number=0;
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
export default class Weworkclick extends Component {
  state = { visible: false, desk:params[number] }
  htmlId=''

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  // onChange(desk){
  //   this.setState({desk:desk.target.value});
  // }

  handleOk = (e) => {
    this.putUp();
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
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
  putUp(){
    axios({
      methods:'get',
      url:`${URL}/desk/updateDeskHtmlId?htmlId=${this.htmlId}&deskId=${this.state.desk}`,
      dataType: "json",
      data:{
        htmlId:this.htmlId,
        deskId:this.state.desk
      },
      headers:{
        Authorization: AUTH_TOKEN,
        'Ocp-Apim-Trace': true,
        'Content-type': 'application/x-www-form-urlencoded',
      }
    }).then((response)=>{
      number++;
      this.state.desk=params[number];
      this.htmlId='';
    });

  }
  componentDidMount() {
    this.setToken();
    let _this=this;
    let a = document.getElementById("balphasvgc");
    a.addEventListener("load",function(){
        // get the inner DOM of alpha.svg
        let svgDoc = a.contentDocument;
        // get the inner element by id
        let delta = svgDoc.getElementsByTagName("rect");
        // add behaviour
        for(let i=0;i<delta.length;i++){
          delta[i].addEventListener("mousedown",function(){
              if(delta[i].getAttribute('fill')==='#FFD6D6' || delta[i].getAttribute('fill')==='#00A699' || delta[i].getAttribute('fill')==='#F5CECE' || delta[i].getAttribute('fill')==='#CCEDEB'){
                  delta[i].setAttribute('stroke','#654df6');
                  delta[i].setAttribute('fill','#654df6');
                  _this.htmlId=delta[i].getAttribute('id');
                  _this.showModal();
              }
          }, false);
        }
    }, false);
  }

  render() {
    return (
      <div className={styles.main}>
        <iframe src={require("./img/beijingclick.svg")} width="1024px" height="768px" id="balphasvgc"
        frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* <Input placeholder="请输入id" value={this.state.desk} onChange={this.onChange.bind(this)}/> */}
          {/* <Input placeholder="请输入id" value={this.state.desk}/> */}
          <p>{this.state.desk}</p>
        </Modal>
       </div>
    );
  }
}
