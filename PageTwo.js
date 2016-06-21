import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PDFView from 'react-native-pdf-view';

export default class PageTwo extends Component {
  render() {
    return (
      <View style={{margin: 128}}>
        <Text>This is PageTwo!</Text>
        <Text>{this.props.title}</Text>
        <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
          src={"sdcard/pdffile.pdf"}
          onLoadComplete = {(pageCount)=>{
            this.pdfView.setNativeProps({
              zoom: 1.5
            });
          }}
          style={{flex:1}}/>
      </View>
    )
  }
}
