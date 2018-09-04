import React, { Component } from 'react';
import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';

const styles = {
  peskView: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '112px',
    height: '54px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: '#ccedeb', // 浅蓝
    border: '1px solid #00a699',
  },
  peskView2: {
    position: 'relative',
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
    backgroundColor: '#ffdedf', // 浅红
    border: '1px solid #f34146',
  },
  peskView3: {
    position: 'relative',
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
    backgroundColor: '#DCDCDC', // 浅灰
    border: '1px solid #808080',
  },
};

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0,
      anim: props.data.active ? new Animated.Value(1) : new Animated.Value(0),
      // anim: props.data.status === '离线' ? new Animated.Value(1) : new Animated.Value(0),
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
    const { data, title, style, hideValue } = this.props;
    const status = data.devices && data.devices[0] && data.devices[0].deviceTwin && data.devices[0].deviceTwin.status;
    return (
      <div style={Object.assign({}, styles.peskView, style)}>
        <Animated.div style={Object.assign({}, styles.peskView2, { opacity: this.state.anim })}>
          <font style={{ fontSize: 30, color: '#f34146' }}>{data.value}</font>
        </Animated.div>
        <font style={{ fontSize: 30, color: '#00a699' }}>{data.value}</font>
        <Animated.div style={Object.assign({}, styles.peskView3, { opacity: status === 'offline' || data.value === '' ? 1 : 0 })}>
          <font style={{ fontSize: 24, color: '#808080' }}>{status === 'offline' ? '离线' : '空'}</font>
        </Animated.div>
      </div>
    );
  }
}

export default Item;
