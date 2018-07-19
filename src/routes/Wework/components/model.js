import React, { Component } from 'react';
import { Link } from 'dva/router';
import axios from 'axios';
import { Modal} from 'antd';
import { Input } from 'antd';

export default class LoginPage extends Component {
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

  render() {
    return (
      <div>
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
