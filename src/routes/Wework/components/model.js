import React, { Component } from 'react';
import { Modal,Input } from 'antd';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.dask = '';
  }
  
  getDeskInfo(){
    return this.desk;
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input placeholder="请输入id" value={this.dask} />
        </Modal>
      </div>
    );
  }
}
