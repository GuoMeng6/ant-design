import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal} from 'antd';
import { Input } from 'antd';
import axios from 'axios';
import styles from './Wework.less';

export default class Weworkfunclick extends Component {
  state = { visible: false }
  dask=''

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  getDeskInfo(){
    return desk;
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  componentDidMount() {
    let _this=this;
    let a = document.getElementById("alphasvg");
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
                  // cs=delta[i].getAttribute('id');
                  _this.showModal();
              }
          }, false);
        }
    }, false);
  }

  render() {
    return (
      <div className={styles.main}>
        <iframe src={require("./img/beijingclick.svg")} width="1024px" height="768px" id="alphasvg"
        frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="请输入id" value={this.dask} />
        </Modal>
       </div>
    );
  }
}
