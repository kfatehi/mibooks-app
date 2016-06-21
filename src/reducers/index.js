import { keyBy } from 'lodash';

const INITIAL_STATE = {
  list: []
}

function max(a, b) {
  return parseInt(a) < parseInt(b) ? a : b;
}

export function books(state = INITIAL_STATE, action) {

  function updateList({ local, remote }) {
    if (local) {
      return { list: local }
    } else if (remote) {
      var keyedLocalBooks = keyBy(local, 'id');
      var newList = remote.map(function({ id, title, author, page, scale }) {
        var localBook = keyedLocalBooks[id];
        if (localBook) {
          var maxPage = max(page, localBook.page);
          return { id, title, author, page: maxPage, scale: localBook.scale, local: true }
        } else {
          return { id, title, author, page, scale, local: false}
        }
      })
      return { list: newList }
    }
  }

  switch (action.type) {
    case 'UPDATE_BOOKS':
      return updateList(action)
  }
  return state;
}
