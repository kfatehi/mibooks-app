import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';
import {
  ListView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { BookRow } from './BookRow';
import { Actions } from 'react-native-router-flux';

export const Books = React.createClass({
  render: function() {
    const { books } = this.props;
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    var dataSource = ds.cloneWithRows(books);
    var styles = StyleSheet.create({
      bookList: {
        marginTop: 20,
        flex: 1
      },
      pdf: {
        flex: 1
      }
    })
    return (
      <View>
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={(book) => <BookRow
            book={book}
            onPress={() => Actions.pageTwo(book) }
          /> }
          style={styles.bookList}
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
