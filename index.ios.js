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
  AsyncStorage
} from 'react-native';
import { Provider } from 'react-redux';
import { BooksContainer } from './src/components/Books';
import store from './src/store';

AsyncStorage.getItem('LOCAL_BOOKS').then(function(val) {
  //store.dispatch({
  //  type: "SET_LOCAL_BOOKS",
  //  books: val
  //})
}).catch(function(err) {
  console.log(err.message);
});

fetch('http://192.168.1.58:3000/books.json').then(res => res.text())
.then(function(resText) {
  var books = JSON.parse(resText).books;
  console.log(books);
  //store.dispatch({
  //  type: "SET_REMOTE_BOOKS",
  //})
}).catch(function(err) {
  console.log(err.message);
});

class MiBooksApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <BooksContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('MiBooksApp', () => MiBooksApp);
