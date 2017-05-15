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
  ListView,
  Keyboard,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import Footer from './footer';
import Header from './header';
import Row from './row';

const filterItems = ( filter, items )=>{
  return items.filter((item)=>{
    if (filter == 'All') return true;
    if (filter == 'Complete') return item.complete;
    if (filter == 'Active' ) return !item.complete;
  })
}
export default class App extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged:(r1, r2)=> r1 !== r2
    });
    this.state ={
      loading:true,
      allComplete:false,
      value : '',
      filter:'All',
      items :[],
      dataSource: ds.cloneWithRows([]),
    }
    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.handleToggleEditing =this.handleToggleEditing.bind(this);
    this.handleClearComplete = this.handleClearComplete.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.setSource = this.setSource.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }
  componentWillMount(){
    AsyncStorage.getItem('items').then((json)=>{
       try{
          const items= JSON.parse(json);
          this.setSource(items,items,{loading: false});
       }catch(e){
          this.setState({
            loading: false
          })
       }
    })
  }
  handleAddItem(){
     if (!this.state.value) return;
     const newItems = [
       {
         key: Date.now(),
         text:this.state.value,
         complete:false
       }
     ]
     this.setSource(newItems,filterItems(this.state.filter,newItems),{value:''})
     this.setState({
       items: newItems,
       value:'',
     })
  }
  setSource (items, itemsDatasource, otherState = {}){
     this.setState({
       items,
       dataSource:this.state.dataSource.cloneWithRows(itemsDatasource),
       ...otherState
     })
     AsyncStorage.setItem('items',JSON.stringify(items));
  }
  handleToggleAllComplete () {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item)=>({
      ...item,
      complete
    }))
     this.setSource(newItems,filterItems(this.state.filter,newItems),{allComplete:complete})
    
  }
  handleToggleComplete(key,complete){
    const newItems = this.state.items.map((item)=>
    {
      if (item.key !== key) return item;
      return{
        ...item,
        complete
      }
    })
    this.setSource(newItems,filterItems(this.state.filter,newItems));
  }
  handleRemoveItem(key){
    const newItems = this.state.items.filter((item)=>{
      return item.key !==key
    })
    this.setSource(newItems,filterItems(this.state.filter,newItems))
  }
  handleFilter(filter){
    this.setSource(this.state.items, filterItems (filter, this.state.items),{filter})
  }
  handleClearComplete(){
    const newItems = filterItems('Active',this.state.items);
    this.setSource(newItems,filterItems(this.state.filter,newItems));
  }
  handleUpdateText(key,text){
    const newItems = this.state.items.map((item)=>{
      if (item.key !== key) return item;
      return{
        ...item,
        text
      }
    })
    this.setSource(newItems,filterItems(this.state.filter,newItems));
  }
  handleToggleEditing(key,editing){
    const newItems = this.state.items.map((item)=>{
      if (item.key !== key) return item;
      return{
        ...item,
        editing
      }
    })
    this.setSource(newItems,filterItems(this.state.filter,newItems));
  }
  render() {
    return (
      <View style = {styles.container} >
        <Header 
        value = {this.state.value}
        onAddItem = {this.handleAddItem}
        onChange = {value =>this.setState({value})}
        onToggleAllComplete = {this.handleToggleAllComplete}
        />
        <View style = {styles.content}>
          <ListView 
          style = {styles.list}
          enableEmptySections
          dataSource= {this.state.dataSource}
          onScroll = {()=>Keyboard.dismiss()} 
          renderRow ={({key, ...value}) =>{
            return(
              <Row
              onComplete ={
                (complete)=>this.handleToggleComplete(key,complete)
              }
              key = {key}
              {...value}
              onRemove ={()=>this.handleRemoveItem(key)}
              onUpdate = {(text)=>this.handleUpdateText(key,text)}
              onToggleEdit = {(editing)=>this.handleToggleEditing(key,editing)}
              />
            )
          }}
          renderSeparator = {(sectionId,rowId)=>{
            return <View key = {rowId} style = {styles.separator} />
          }}
          />
        </View>
        <Footer 
        count = {filterItems("Active", this.state.items).length}
        filter ={this.props.filter}
        onFilter = {this.handleFilter}
        onClearComplete = {this.handleClearComplete}
        />
        {this.state.loading && <View style = {styles.loading}>
            <ActivityIndicator
            animating
            size='large'
            />
        </View>}
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  content:{
    flex : 1,
  },
  list:{
    backgroundColor:"#fff",
  },
  separator:{
    borderWidth:10,
    borderColor:'#F5F5F5',
  },
  loading:{
    position:'absolute',
    left: 0,
    top: 0,
    right:0,
    bottom:0,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"rgba(0,0,0,.2)",

  }
});
