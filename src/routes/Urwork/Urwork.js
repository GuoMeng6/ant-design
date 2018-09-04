import React, { Component } from 'react';

import styles from './Urwork.less';
import Key from '../../components/sensor/Key';
import Pesk from './Pesk';

class Urwork extends Component {

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <div style={{ flex:1 }} />
          <Key />
          <div style={{ width: 60 }} />
        </div>
        <Pesk />
      </div>
    )
  }
}

export default Urwork;
