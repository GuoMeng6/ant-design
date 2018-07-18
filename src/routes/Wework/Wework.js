import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import styles from './Wework.less';

@connect(() => ({}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  render() {
    return (
      <div className={styles.main} >
       <img src={require('./img/njbg.png')}/> 
    </div>
    );
  }
}
