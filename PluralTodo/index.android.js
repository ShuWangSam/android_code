/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';



import TaskList from './TaskList.js';
import TaskForm from './TaskForm.js'; 

export default class PluralTodo extends Component {
  constructor(props, context){
    super(props, context);
    this.state ={
      todos:[
        {
          task: "Learn React Native2",
        },
        {
          task: "Learn React Native",
        },
      ],
    };
  }
  onAddStarted(){
   this.nav.push({
     name:'taskform',
   })
  }

  onCancel(){
    console.log('cancelled!')
    this.nav.pop(); 
    //hide the cuurent view and revert the previous view
  }
  
  onDone(todo){
    console.log('task was completed',todo.task)
    const filteredTodos = 
      this.state.todos.filter((filterTodo)=>{
          return filterTodo !== todo;
        });
    this.setState({ todos: filteredTodos});
  }

  onAdd(task){
    console.log('a task was added:',task);
    this.state.todos.push({ task });
    this.setState({ todos:this.state.todos });
    this.nav.pop();
  }
  
  renderScene(route,nav){
    switch(route.name){
      case 'taskform':
       return (
       <TaskForm 
          onCancel ={this.onCancel.bind(this)}
          onAdd = {this.onAdd.bind(this)}
       />
       );
       default:
         return(
            <TaskList
                onDone = {this.onDone.bind(this)}
                onAddStarted = {this.onAddStarted.bind(this)}
                todos = {this.state.todos} />
         );
     }
   }
    // Optional function that allows configuration 
    // about scene animations and gestures. 
   configureScene(){
      return Navigator.SceneConfigs.FloatFromBottom;
   }

   render() {
      return (
          <Navigator
              configureScene ={this.configureScene}
              initialRoute ={{ name: 'tasklist', index: 0}}
              ref = {((nav) => {
                this.nav = nav;
              })} //reference(find)
              renderScene = {this.renderScene.bind(this)}
          />
      );
    }
}




AppRegistry.registerComponent('PluralTodo', () => PluralTodo);
