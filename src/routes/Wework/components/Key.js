import React, { Component } from 'react';

const styles = {
  container: {
    width: '401px',
    height:'26px',
    position:'absolute',
    right:'0',
    bottom:'36px',
  },
  text: {
    position:'absolute',
    right:'271px',
    top:'0',
    fontSize: '18px',
    color: '#35536C',
    lineHeight:'26px',
  },
  peskView2: {
    width: 24,
    height: 24,
    backgroundColor: '#ffdedf', //浅红
    border: '1px solid #f34146',
    borderRadius: 4,
    position:'absolute',
    right:'223px',
    top:'0',
  },
  activeText: {
    fontSize: 12,
    color: '#262834',
    lineHeight:'26px',
    position:'absolute',
    right:'160px',
    top:'0',
  },
  peskView: {
    width: 24,
    height: 24,
    backgroundColor: '#ccedeb', //浅蓝
    border: '1px solid #00a699',
    borderRadius: 4,
    position:'absolute',
    right:'112px',
    top:'0',
  },
  activeText2: {
    fontSize: 12,
    color: '#262834',
    lineHeight:'26px',
    position:'absolute',
    right:'64px',
    top:'0',
  },

};

class Key extends Component {
  render() {
    return (
      <div style={styles.container}>
        <font style={styles.text}>Legend</font>
        <div style={styles.peskView2} />
        <font style={styles.activeText}>Occupied</font>
        <div style={styles.peskView} />
        <font style={styles.activeText2}>Vacant</font>
      </div>
    );
  }
}

export default Key;
