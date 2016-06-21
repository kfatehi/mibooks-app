import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { BooksContainer } from './src/components/Books';

export default class PageOne extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <BooksContainer />
      </View>
    )
  }
}
