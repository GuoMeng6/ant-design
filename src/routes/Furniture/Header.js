import React, { Component } from 'react';

import Key from '../../components/sensor/Key';

const styles = {
  container: {
    width:'100%',
    height: '52px',
    marginTop: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 64,
    paddingRight: 64,
  },
  img: {
    height: 51,
    width:245,
  },
}

export default class Header extends Component {
  
  render() {
    return (
      <div style={styles.container}>
        <img
          src="http://otlb76s3r.bkt.clouddn.com/furniture/logo@3x.png"
          style={styles.img}
        />
        <div style={{ flex: 1 }} />
        
        <Key />
      </div>
    );
  }
}
