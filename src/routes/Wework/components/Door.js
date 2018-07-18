import React, { Component } from 'react';

const styles = {
  container: {
    width: '100%',
    marginTop: 20,
  },
  door: {
    width: 40,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #808080',
  },
};

class Door extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.door}>
          <font>门</font>
        </div>
      </div>
    );
  }
}

export default Door;
