import React, { Component } from 'react';

import Header from './Header';
import Pesk from './Pesk';
import styles from './Furniture.less';

class Furniture extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.main}>
        <Header />
        <Pesk />
        <font className={styles.text}>9AM Standing Desk and Smart Workspace Solution</font>
      </div>
    );
  }
}

export default Furniture;
