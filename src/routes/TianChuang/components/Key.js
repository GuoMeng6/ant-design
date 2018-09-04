import React, { Component } from 'react';

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  text: {
    fontSize: 24,
    color: '#262834',
    fontWeight: 200,
  },
  activeText: {
    fontSize: 14,
    color: '#262834',
    marginLeft: 10,
    fontWeight: 200,
  },
  activeText2: {
    fontSize: 14,
    color: '#262834',
    marginLeft: 10,
    fontWeight: 200,
    marginRight: 40,
  },
  peskView: {
    width: 24,
    height: 24,
    backgroundColor: '#ccedeb', // 浅蓝
    border: '1px solid #00a699',
    borderRadius: 4,
    marginLeft: 20,
  },
  peskView2: {
    width: 24,
    height: 24,
    backgroundColor: '#ffdedf', // 浅红
    border: '1px solid #f34146',
    borderRadius: 4,
    marginLeft: 20,
  },
  peskView3: {
    width: 24,
    height: 24,
    backgroundColor: '#DCDCDC',
    border: '1px solid #808080',
    borderRadius: 4,
    marginLeft: 20,
  },
};

class Key extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={{ flex: 1 }} />
        <font style={styles.text}>图例</font>
        <div style={styles.peskView2} />
        <font style={styles.activeText}>占用</font>
        <div style={styles.peskView} />
        <font style={styles.activeText}>空闲</font>
        <div style={styles.peskView3} />
        <font style={styles.activeText2}>离线或未装置</font>
      </div>
    );
  }
}

export default Key;
