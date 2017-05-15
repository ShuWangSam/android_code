import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor:'#E7E7E7',
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,

    },
    label:{
        fontSize:20,
        fontWeight: "300",
    },
    doneButton : {
        borderRadius: 5,
        backgroundColor: '#EAEAEA',
        padding:5,
    }
})


export default class TaskRow extends Component {
  onDonePressed(){
      this.props.onDone(this.props.todo);
  }
  render(){
     return(
         <View style = {styles.container}>
              <Text style = {styles.label}> 
                  {this.props.todo.task}
              </Text>

              <TouchableHighlight
                onPress = {this.onDonePressed.bind(this)}
                style ={styles.doneButton}
              >
                  <Text>
                      Done
                  </Text>
              </TouchableHighlight>
         </View>
     )
   }
}

//shape control proptypes inside an object
TaskRow.propTypes = {
  onDone: React.PropTypes.func.isRequired,
  todo: React.PropTypes.shape({
      task: React.PropTypes.string.isRequired,
  }).isRequired,
}
