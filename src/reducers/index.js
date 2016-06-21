import { map, keyBy, findIndex } from 'lodash';

const INITIAL_STATE = {
  list: [],
  listById: {}
}

function max(a, b) {
  return parseInt(a) < parseInt(b) ? a : b;
}

export function books(state = INITIAL_STATE, action) {

  function updateList({ local, remote }) {
    if (local) {
      return {
        list: map(local, 'id'),
        listById: keyBy(local, 'id')
      }
    } else if (remote) {
      var keyedLocalBooks = keyBy(local, 'id');
      var newList = remote.map(function({ id, title, author, page, scale, path, filename }) {
        var localBook = keyedLocalBooks[id];
        if (localBook) {
          var maxPage = max(page, localBook.page);
          return { id, title, author, page: maxPage, scale: localBook.scale, local: true, filename }
        } else {
          return { id, title, author, page, scale, local: false, path, filename }
        }
      })
      return {
        list: map(newList, 'id'),
        listById: keyBy(newList, 'id')
      }
    }
  }

  function updateListItemAttribute(id, key, val) {
    return {
      list: state.list,
      listById: Object.assign({}, state.listById, {
        [id]: Object.assign({}, state.listById[id], { [key]: val })
      })
    }
  }

  switch (action.type) {
    case 'UPDATE_BOOKS':
      return updateList(action)
    case 'DOWNLOADING_BOOK':
      return updateListItemAttribute(action.id, 'downloading', true)
  }
  return state;
}
