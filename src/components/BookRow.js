import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';

export class BookRow extends Component {
  render() {
    const { book: { title }, onPress } = this.props;
    return (
      <TouchableHighlight onPress={onPress}>
        <Text>{title}</Text>
      </TouchableHighlight>
    )
  }
}
