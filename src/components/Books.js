import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import {
  ListView, Text,
  StyleSheet
} from 'react-native';
import { BookRow } from './BookRow';

export const Books = React.createClass({
  render: function() {
    const {
      books,
      openBook
    } = this.props;
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    var dataSource = ds.cloneWithRows(books);
    var styles = StyleSheet.create({
      bookList: {
        marginTop: 20
      }
    })
    return (
      <ListView
        enableEmptySections={true}
        dataSource={dataSource}
        renderRow={(book) => <BookRow
          book={book}
          onPress={() => { openBook(book)}}
        /> }
        style={styles.bookList}
      />
    );
  }
})

function mapStateToProps(state, props) {
  return {
    books: state.books.list
  };
}

export const BooksContainer = connect(
  mapStateToProps,
  actionCreators
)(Books);
