import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableHighlight,
} from 'react-native';

import TaskRoW from './TaskRow'

const styles = StyleSheet.create({
  container:{
    paddingTop:40,
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'flex-start',
  },
  button:{
     height: 60,
     borderColor: '#05A5D1',
     borderWidth: 2,
     backgroundColor: '#333',
     margin: 20,
     justifyContent: 'center',
     alignItems: 'center',
  },
  buttonText:{
     color: '#FAFAFA',
     fontSize: 20,
     fontWeight: '600',
  },
})

export default class TaskList extends Component {
  constructor(props,context){
    super(props,context);
    
    const ds = new ListView.DataSource({
       rowHasChanged: (r1, r2)=>r1 !== r2,
    })

    this.state = {
      dataSource: ds.cloneWithRows(props.todos),
    } 
  }

  componentWillReceiveProps(nextProps){
    const dataSource = this
        .state
        .dataSource
        .cloneWithRows(nextProps.todos);
      
    this.setState({ dataSource });
  }

  renderRow(todo){
      return(
        <TaskRoW 
          onDone = {this.props.onDone}
          todo = {todo} 
        />
      )
    }

  render(){
     return(
       <View style ={styles.container} >
         <ListView
           dataSource = {this.state.dataSource}//dataSource
           key = {this.props.todos} //id
           renderRow = {this.renderRow.bind(this)}//function
         />
         <TouchableHighlight
            onPress = {this.props.onAddStarted}
            style = {styles.button}
         >
           <Text
           style = {styles.buttonText}
           >
             Add One
           </Text>
         </TouchableHighlight>
       </View>
     )
   }
}

TaskList.propTypes = {
  onAddStarted: React.PropTypes.func.isRequired,
  todos: React.PropTypes
      .arrayOf(React.PropTypes.object).isRequired,
    
}

