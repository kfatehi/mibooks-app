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
import { Provider } from 'react-redux';
import { BooksContainer } from './src/components/Books';
import store from './src/store';
import { fetchBooks } from './src/api-client';
import { getLocalBooks } from './src/storage';

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

store.subscribe(function() {
  console.log('state change', store.getState());
});

getLocalBooks().then(function(books) {
  store.dispatch({ type: "UPDATE_BOOKS", local: books })
  fetchBooks().then(function(books) {
    store.dispatch({ type: "UPDATE_BOOKS", remote: books })
  }).catch(function(err) {
    console.log('failed to fetch', err.stack);
  });
}).catch(function(err) {
  console.warn(err.message);
});

