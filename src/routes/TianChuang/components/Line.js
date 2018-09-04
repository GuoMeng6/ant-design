import React, { Component } from 'react';
import Item from './Item';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    marginTop: 40,
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 40,
    alignItems: 'center',
  },
  cabinet: {
    width: 60,
    height: 140,
    backgroundColor: '#808080',
    display: 'flex',
    flexDirection: 'cloumn',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cabtext: {
    fontSize: 16,
    color: '#ffffff',
  },
  columndiv: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  rowdiv: {
    display: 'flex',
    flexDirection: 'row',
  },
};

class Line extends Component {
  render() {
    const { data, title } = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.container2}>
          <div style={styles.cabinet}>
            <font style={styles.cabtext}>{title}</font>
          </div>
          <div style={styles.columndiv}>
            <div style={styles.rowdiv}>
              {data.slice(0, 5).map((value, index) => {
                return <Item data={value} style={{ marginLeft: index === 0 ? 5 : 20 }} />;
              })}
            </div>
            <div style={styles.rowdiv}>
              {data.slice(5, 10).map((value, index) => {
                return <Item data={value} style={{ marginLeft: index === 0 ? 5 : 20, marginTop: 10 }} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Line;
