import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

export class BookRow extends Component {
  render() {
    const {
      book: {
        title,
        author,
        page,
        scale,
        local
      },
      onPress
    } = this.props;
    return (
      <TouchableHighlight onPress={onPress}>
        <View>
          <Text>Title: {title}</Text>
          <Text>Author: {author}</Text>
          <Text>Page: {page}</Text>
          <Text>{local ? 'Local' : 'Remote'}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
