import React, { Component } from 'react';
import Animated from 'animated/lib/targets/react-dom';

const styles = {
  peskView: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: 400,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: '#ccedeb',
    border: '1px solid #00a699',
  },
  peskView2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 8,
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    backgroundColor: '#ffdedf',
    border: '1px solid #f34146',
  },
  deskView: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: '#ccedeb', 
    border: '1px solid #00a699',
  },
  deskView2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    borderRadius: 8,
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    backgroundColor: '#ffdedf',
    border: '1px solid #f34146',
  },
};

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anim: props.data.active ? new Animated.Value(1) : new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.active && !this.props.data.active) {
      this.startAnim();
    }
    if (!nextProps.data.active && this.props.data.active) {
      this.endAnim();
    }
  }

  startAnim() {
    Animated.timing(this.state.anim, { toValue: 1, duration: 300 }).start();
  }

  endAnim() {
    Animated.timing(this.state.anim, { toValue: 0, duration: 300 }).start();
  }

  render() {
    const { data, title, style } = this.props;
    return (
      <div style={Object.assign({}, styles.peskView, style)}>
        <Animated.div style={Object.assign({}, styles.peskView2, { opacity: this.state.anim })}>
          <font style={{ fontSize: 60, color: '#f34146' }}>
            {data.height}
            <font style={{ fontSize: 30 }}>{data.height ? ' cm' : ''}</font>
          </font>
        </Animated.div>
        <font style={{ fontSize: 14, color: '#00a699', marginRight: title ? 5 : 0 }}>{title ? '升降桌' : ''}</font>
        <font style={{ fontSize: 60, color: '#00a699' }}>
          {data.height}
          <font style={{ fontSize: 30 }}>{data.height ? ' cm' : ''}</font>
        </font>
      </div>
    );
  }
}

export default Item;
