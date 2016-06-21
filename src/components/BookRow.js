import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

export class BookRow extends Component {
  render() {
    const {
      book: {
        title,
        author
      },
      onPress
    } = this.props;
    return (
      <TouchableHighlight onPress={onPress}>
        <View>
          <Text>Title: {title}</Text>
          <Text>Author: {author}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
