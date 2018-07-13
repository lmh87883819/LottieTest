import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import ImagePick from 'react-native-image-picker';

export default class ImagePicker extends Component {
    constructor(props) {
        super(props);
        this.UPLOAD_URL = '';
        this.state = {
            files: [],
            uploadImgsUrl:[]
        }
    }

    uploadImage = (uri) => {
        let formData = new FormData();
        let file = {uri: uri, type: 'multipart/form-data', name: 'a.jpg'};
        formData.append("images",file);
        fetch(UPLOAD_URL,{
          method:'POST',
          headers:{
              'Content-Type':'multipart/form-data',
          },
          body:formData,
        })
        .then((response) => response.json() )
        .then((responseData)=>{
          this.setState({
            uploadImgsUrl:this.state.uploadImgsUrl.concat(
                responseData.url[0]
              )
          })
          console.log('responseData',this.state.uploadImgsUrl);
        })
        .catch((error)=>{console.error('error',error)});
    }

    onAddImageClick = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
              skipBackup: true
            }
          };
      
    ImagePick.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
            console.log('User cancelled photo picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };
            this.setState({
            files: this.state.files.concat(
                    source
                ),
            });
            //this.uploadImage(response.uri)
        }
    });
}

    cancelImg = (i) => {
        this.state.files.splice(i,1);
        this.state.uploadImgsUrl.splice(i,1);
        this.setState({
            files:[...this.state.files]
        })
    }

    render(){
        const { files } = this.state;
        this.UPLOAD_URL = this.props.uploadUrl;
        return(
            <View style={styles.container}>
                <View style={styles.containerBottom}>
                    <View style={styles.uploadImg}>
                    {this.state.files.length>0 ? this.state.files.map((img,i)=>(
                        <View key={i} style={styles.image}>
                            <Image source={img} style={{width:'100%',height:'100%'}}/>
                            <View style={styles.cancel}><Text style={{fontSize:14,color:'#fff'}} onPress={()=>{this.cancelImg(i)}}>+</Text></View>
                        </View>
                        ))
                    :null}
                    {this.state.files.length<10 ? <TouchableOpacity
                        style={styles.addImg}
                        onPress={()=>this.onAddImageClick()}
                    >
                        <View><Text style={{marginTop:10,fontSize:40}}>+</Text></View>  
                    </TouchableOpacity> : null}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flexWrap:'wrap',
      flex: 1,
      width:'100%',
      marginTop:13,
      backgroundColor:'#fefefe',
    },
    containerBottom:{
        flex:1,
    },
    uploadImg:{
        flex:1.5,
        flexDirection:'row',
        marginTop:10,
        marginLeft:20,
    },
    addImg:{
        alignItems:'center',
        height:80,
        width:80,
        borderColor:'#999',
        borderStyle:'solid',
        borderWidth:1
    },
    image:{
        alignItems:'center',
        height:80,
        width:80,
        marginRight:10,
    },
    cancel:{
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        right:0,
        top:0,
        height:15,
        width:15,
        backgroundColor:'#3f9de2',
        borderRadius:10,
        transform:([{ rotate:'45deg' }])
    }
  });
