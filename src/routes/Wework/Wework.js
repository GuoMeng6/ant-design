import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';


import Key from './components/Key';
import styles from './Wework.less';

@connect(() => ({}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  render() {
    return (
      <div className={styles.main}>
        {/* logo */}
        <img src={require('./img/njbg.png')}/>
        <font className={styles.title}>6TH FLOOR</font>
        <div className={styles.line}></div>
        <font className={styles.text}>West Nanjing Rd</font>


        {/* 注释 */}
        <Key/>
      </div>
    );
  }
}
