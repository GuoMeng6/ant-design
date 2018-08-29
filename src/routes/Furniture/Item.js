import React, { Component } from 'react';
import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';

const styles = {
  peskView: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '280px',
    height: '120px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: '#ccedeb', // 浅蓝
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
    backgroundColor: '#ffdedf', // 浅红
    border: '1px solid #f34146',
  },
};

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0,
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
    const { data,  style } = this.props;
    return (
      <div style={Object.assign({}, styles.peskView, style)}>
        <Animated.div style={Object.assign({}, styles.peskView2, { opacity: this.state.anim })} />
      </div>
    );
  }
}

export default Item;
