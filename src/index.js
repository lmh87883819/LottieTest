import React from 'react'
import { View, Text, WebView,StyleSheet } from 'react-native'
import movieService from '../src/service/movie'
import movieStorage from '../src/dao/movie'
import '../src/md5/md5'
import sign from '../src/md5/sign'
import Video from 'react-native-video'

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }

  componentDidMount() {
    // var a = sign('EFBFCB31D5BACE6BB5793A529254424E')
    // console.log(a);
    movieStorage.clearAll('42249')
    // movieService.goHome().then(data => {
    //   console.log(data);
    // })
    // movieService.getMovieByTypeAndPage(1,1).then(data => {
    //   console.log(data);
    // })
    // movieService.getMovieDetails('http://www.7nmg.com/show/656.html','656').then(data=>{
    //   console.log(data);
    // })
    movieService.getMovieResource(42249, 1).then(data => {
      this.setState({
        data
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Video source={{ uri: "http://vd3.bdstatic.com/mda-ig04g27dufvjpaie/sc/mda-ig04g27dufvjpaie.mp4" }}   // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref
          }}
          style={styles.backgroundVideo}                                      // Store reference
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  backgroundVideo: {
    height:200,
    width:200,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});