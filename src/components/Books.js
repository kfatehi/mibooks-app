import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import {
  ListView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { downloadBook }  from '../core';

export const BookRowView = React.createClass({
  render: function() {
    const { title, author, local, downloading } = this.props.book;
    return <TouchableHighlight onPress={this.props.handlePress}>
      <View>
        <Text>Title: { title}</Text>
        <Text>Author: {author}</Text>
        <Text>{local ? 'Local' : ( downloading ? 'Downloading' : 'Remote' )}</Text>
      </View>
    </TouchableHighlight>;
  }
})

export const Books = React.createClass({
  render: function() {
    const {
      books,
      booksById,
      bookDownloadStarted,
      bookDownloadFinished
    } = this.props;
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    var dataSource = ds.cloneWithRows(books);
    var handlePress = id => () => {
      var book = booksById[id];
      console.log('press book', book.id);
      if (book.local) { 
        Actions.pageTwo({ book });
      } else if (book.downloading) {
        console.log('already downloading!');
      } else {
        bookDownloadStarted(id)
        downloadBook(book).then(function(res) {
          bookDownloadFinished(id, res)
        }).catch(function(err) {
          console.log(err.stack);
          bookDownloadFailed(id, err)
        })
      }
    }
    return (
      <View>
        <ListView
          enableEmptySections={true}
          style={{ marginTop: 20 }}
          dataSource={dataSource}
          renderRow={id => <BookRowView
            book={booksById[id]} handlePress={handlePress(id)} />}
        />
      </View>
    );
  }
})

function mapStateToProps(state, props) {
  return {
    books: state.books.list,
    booksById: state.books.listById
  };
}

export const BooksContainer = connect(
  mapStateToProps,
  actionCreators
)(Books);
