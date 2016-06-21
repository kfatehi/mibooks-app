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

export const Books = React.createClass({
  render: function() {
    const { books } = this.props;
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    var dataSource = ds.cloneWithRows(books);
    var handlePress = book => () => {
      console.log('press book', book.id);
      if (book.local) { 
        Actions.pageTwo();
      } else {
        console.log('ok i must dl it', book.path);
        // dispatch that we are downloading to display it and prevent double-invoke
        downloadBook(book).then(function(res) {
          console.log(`downloaded file to ${res}`);
        }).catch(function(err) {
          console.log(err.stack);
          // dispatch that it failed, reset, allow retry
        })
      }
    }
    return (
      <View>
        <ListView
          enableEmptySections={true}
          style={{ marginTop: 20 }}
          dataSource={dataSource}
          renderRow={book => {
            return <TouchableHighlight onPress={handlePress(book)}>
              <View>
                <Text>Title: {book.title}</Text>
                <Text>Author: {book.author}</Text>
                <Text>{book.local ? 'Local' : 'Remote'}</Text>
              </View>
            </TouchableHighlight>
            }
          }
        />
      </View>
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
