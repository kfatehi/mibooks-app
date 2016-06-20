import React, { Component } from 'react';
import { Text } from 'react-native';

export class BookRow extends Component {
  render() {
    const { book: { title } } = this.props;
    return (
      <Text>{title}</Text>
    )
  }
}
