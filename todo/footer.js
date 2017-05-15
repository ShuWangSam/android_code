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
  TouchableOpacity,
} from 'react-native';


export default class Footer extends Component {
  render() {
    const {filter} = this.props;
    return (
      <View style = {styles.container}>
        <Text>{this.props.count} count</Text>
        <View style = {styles.filters}>
          <TouchableOpacity style = {[styles.filter, filter =='All' &&styles.selected]} onPress ={()=>this.props.onFilter('All')} >
              <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.filter, filter =='Active' &&styles.selected]} onPress ={()=>this.props.onFilter('Active')}>
               <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.filter, filter =='Complete' &&styles.selected]} onPress ={()=>this.props.onFilter('Complete')}>
               <Text>Complete</Text>  
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress = {this.props.onClearComplete}>
          <Text>Clear Completed</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
     padding:16,
     flexDirection:'row',
     alignItems:"center",
     justifyContent:"space-between",
   },
   filters:{
     flexDirection:"row",
   },
   filter:{
     padding: 8,
     borderRadius:5,
     borderWidth:1,
     borderColor:'transparent'
   },
   selected: {
     borderColor: "rgba(175, 47, 47, .2)",
   },
});
