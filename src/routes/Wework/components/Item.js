import React, { Component } from 'react';
import Animated from 'animated/lib/targets/react-dom';

const defaultStyle = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  backgroundColor: '#ccedeb', // 浅蓝
  border: '1px solid #00a699',
};

const animStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  position: 'absolute',
  top: -1,
  left: -1,
  right: -1,
  bottom: -1,
  backgroundColor: '#ffdedf', // 浅红
  border: '1px solid #f34146',
};

const styles = {
  beijing: {
    default: {
      ...defaultStyle,
      width: '36px',
      height: '18px',
    },
    small: {
      ...defaultStyle,
      width: '36px',
      height: '18px',
    },
    large: {
      ...defaultStyle,
      width: '84px',
      height: '42px',
    },
    square: {
      ...defaultStyle,
      width: '42px',
      height: '42px',
    },
  },
  nanjing: {
    default: {
      ...defaultStyle,
      width: '24px',
      height: '12px',
    },
    small: {
      ...defaultStyle,
      width: '21px',
      height: '10px',
    },
    large: {
      ...defaultStyle,
      width: '24px',
      height: '12px',
    },
    square: {
      ...defaultStyle,
      width: '14px',
      height: '14px',
    },
    column: {
      ...defaultStyle,
      width: '10px',
      height: '21px',
    },
  },
};

class Item extends Component {
  //构建类时调用的构造函数
  constructor(props) {
    super(props);//向父类传递属性
    this.state = {//定义自己的数据
      opacity: 0,
      anim: props.data.active ? new Animated.Value(1) : new Animated.Value(0),
      // anim: props.data.status === '离线' ? new Animated.Value(1) : new Animated.Value(0),
    };
  }
  //在render之前执行一次
  componentWillMount() { }
  //======页面渲染
  // render() {
  //   const { type, style } = this.props;
  //   const deskType = this.getStyle(type);
  //   return (
  //     <div style={Object.assign({}, deskType, style)}>
  //       <Animated.div style={Object.assign({}, animStyle, { opacity: this.state.anim })} />
  //     </div>
  //   );
  // }
  //=======在rander之后立马执行（1次）
  componentDidMount() { }
  //=======接收到新的属性时
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.active && !this.props.data.active) {
      this.startAnim();
    }
    if (!nextProps.data.active && this.props.data.active) {
      this.endAnim();
    }
  }
  //是否需要更新
  shouldComponentUpdate(nextProps, nextState) { }
  //即将更新（准备工作）=》render
  componentWillUpdate() { }
  //render=》更新完成
  componentDidUpdate() { }
  //======销毁
  componentWillUnmount() { }
  //页面定义函数
  startAnim() {
    Animated.timing(this.state.anim, { toValue: 1, duration: 300 }).start();
  }

  endAnim() {
    Animated.timing(this.state.anim, { toValue: 0, duration: 300 }).start();
  }

  getStyle(type) {
    const arr = type.split(' ');
    return styles[arr[0]][arr[1]];
  }
  //======页面渲染
  render() {
    const { type, style } = this.props;
    const deskType = this.getStyle(type);
    return (
      <div style={Object.assign({}, deskType, style)}>
        <Animated.div style={Object.assign({}, animStyle, { opacity: this.state.anim })} />
      </div>
    );
  }

}

export default Item;
