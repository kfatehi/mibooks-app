import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PDFView from 'react-native-pdf-view';

export default class PageTwo extends Component {
  render() {
    const { localPath, scale, page } = this.props.book;
    return (
      <PDFView
        path={localPath}
        pageNumber={page}
        zoom={scale}
        onLoadComplete = {(pageCount)=>{
          console.log('load complete', pageCount);
        }}/>
    )
  }
}
