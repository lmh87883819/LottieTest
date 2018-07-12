import React from 'react';
import { Animated, Easing,View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.spin()
  }

  spin = () => {
    this.state.progress.setValue(0)
    Animated.timing(
        this.state.progress,
      {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear
      }
    ).start(() => this.spin1())
}
spin1 = () => {
    // this.state.progress.setValue(0)
    Animated.timing(
        this.state.progress,
      {
        toValue: 0,
        duration: 8000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
}

  render() {
    return (
            <LottieView style={{flex:1,backgroundColor:'#00D1C1'}} source={require('./1.json')} progress={this.state.progress} />
    );
  }
}