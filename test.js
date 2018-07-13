import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import ImagePicker from './component/ImagePicker'

export default class Test extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={{flex:1}}>
                <ImagePicker 
                    uploadUrl={'http://127.0.0.1:8080/test'}
                ></ImagePicker>
            </View>
        )
    }
}
