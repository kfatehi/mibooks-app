import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import {
  ListView, Text,
  StyleSheet
} from 'react-native';

export const Books = React.createClass({
  render: function() {
    const {
      books
    } = this.props;
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    var dataSource = ds.cloneWithRows(books);
    var styles = StyleSheet.create({
      bookList: {
        marginTop: 20
      }
    })
    return (
      <ListView
        dataSource={dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
        style={styles.bookList}
      />
    );
  }
})

function mapStateToProps(state, props) {
  return {
    books: ['bla']
  };
}

export const BooksContainer = connect(
  mapStateToProps,
  actionCreators
)(Books);
