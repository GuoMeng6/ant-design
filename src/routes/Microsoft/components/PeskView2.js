import React, { Component } from 'react';

import Item from './Item';
import MyButtonGroup from './MyButtonGroup';

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#a5a6ab',
    marginTop: 20,
  },
};

class PeskView2 extends Component {
  onChange(value) {
    this.props.onChange(value);
  }

  render() {
    const { data, title } = this.props;
    return (
      <div style={styles.container}>
        <div style={{ height: '30px' }} />
        <font style={{ fontSize: 18, color: '#f34146', marginBottom: '10px', height: '30px' }}>
          {data.locked === 'on' ? 'Pls unlock before controlling' : ''}
        </font>
        {/* {data.height ? (
          <img src="http://omoxprgv1.bkt.clouddn.com/wework/downarrow.png" style={{ position: 'absolute', top: 128, width: 27, height: 20 }} />
        ) : null}
        <MyButtonGroup onChange={this.onChange.bind(this)} data={data} /> */}
        <div style={{ height: '80px' }} />
        <Item data={data} type="PESK" hideValue />
        <font style={styles.title}>{title}</font>
      </div>
    );
  }
}

export default PeskView2;
