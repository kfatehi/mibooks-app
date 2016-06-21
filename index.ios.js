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
import store from './src/store';
import { fetchBooks } from './src/api-client';
import { getLocalBooks, setLocalBooks } from './src/storage';
import RNFS from 'react-native-fs';
import { Router, Scene } from 'react-native-router-flux';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

class MiBooksApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="pageOne" component={PageOne} title="PageOne" initial={true} />
            <Scene key="pageTwo" component={PageTwo} title="PageTwo" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MiBooksApp', () => MiBooksApp);

store.subscribe(function() {
  setLocalBooks(store.getState().books.listById);
});

getLocalBooks().then(function(books) {
  console.log('getlocalbooks:', books);
  store.dispatch({ type: "UPDATE_BOOKS", local: books })
  fetchBooks().then(function(books) {
    store.dispatch({ type: "UPDATE_BOOKS", remote: books })
  }).catch(function(err) {
    console.log('failed to fetch', err.stack);
  });
}).catch(function(err) {
  console.warn(err.message);
});
