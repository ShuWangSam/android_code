/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  TextInput,
} from 'react-native';


export default class Row extends Component {
  render() {
    const { complete } = this.props;
    const textComponent = (
        <TouchableOpacity  style = {styles.textWrap} onLongPress ={()=>this.props.onToggleEdit(true)}>
             <Text style ={[styles.text, complete &&styles.complete]}>{this.props.text}</Text>
          </TouchableOpacity>
    )
    const removeButton =(
        <TouchableOpacity onPress = {this.props.onRemove}>
              <Text style = {styles.destroy}>
                  X
              </Text>
          </TouchableOpacity>
    )
    const editingComponent = (
        <View style = {styles.textWrap}>
        <TextInput 
          onChangeText = {this.props.onUpdate}
          autoFocus
          value ={this.props.text}
          style = {styles.input}
          multiline
        />
        </View>
    )
    const doneButton =(
        <TouchableOpacity onPress ={()=>this.props.onToggleEdit(false)}>
            <Text>
                Save
            </Text>
        </TouchableOpacity>
    )
    return (
    
      <View style ={styles.container}>
          <Switch 
          value = {this.props.complete}
          onValueChange = {this.props.onComplete}
          />
          {this.props.editing ? editingComponent : textComponent}
          {this.props.editing ? doneButton : removeButton}
          
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container:{
     padding:10,
     flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
   },
   textWrap:{
       marginHorizontal:10,
   },
   text:{
       fontSize:24,
       color:'#4d4d4d',
   },
   complete:{
       textDecorationLine:'line-through'
   },
   destroy:{
       fontSize:20,
       color: '#cc9a9a'
   },
   input:{
       height:100,
       flex:1,
       fontSize:24,
       padding:0,
       color:'#4d4d4d',
   }
});
