import React from 'react'
import { View,Text } from 'react-native'
import movieService from '../src/service/movie'
import movieStorage from '../src/dao/movie'

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieItems:[]
    };
  }

  componentDidMount() {
    movieService.init()
    movieStorage.movieStorageLoad('home')
      .then(data=>{
        console.log(data);
      })
  }

  render() {
    return (
        <View style={{flex:1}}>
          {this.state.movieItems.map((item,index) => (
            <View style={{flex:1}} key={index}>
              <Text key={index}>{item.type}</Text>
              <Text>{item.items[0].title}</Text>
            </View>
          ))}
        </View>
    );
  }
}