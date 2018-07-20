import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Modal} from 'antd';
import { Input } from 'antd';
import axios from 'axios';
import styles from './Wework.less';


const URL = 'https://wework2018apis.azure-api.cn';
let AUTH_TOKEN = '';
export default class Weworkclick extends Component {
  state = { visible: false, desk:'' }
  htmlId=''

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  onChange(desk){
    this.setState({desk:desk.target.value});
  }

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
    console.log(AUTH_TOKEN);
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
      console.log(response);
      this.htmlId='';
      this.state.desk='';
    });

  }
  componentDidMount() {
    this.setToken();
    let _this=this;
    let a = document.getElementById("alphasvgc");
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
        <iframe src={require("./img/nanjingclick.svg")} width="1024px" height="768px" id="alphasvgc"
        frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="请输入id" value={this.state.desk} onChange={this.onChange.bind(this)}/>
        </Modal>
       </div>
    );
  }
}
