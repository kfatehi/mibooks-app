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
      var newList = remote.map(function({ id, title, author, page, scale, path, filename }) {
        var book = state.listById[id];
        if (book && book.local) {
          return {
            id, title, author,
            page: max(page, book.page),
            scale: book.scale,
            downloading: false,
            local: true,
            localPath: book.localPath,
            filename
          }
        } else {
          return {
            id, title, author, page, scale,
            downloading: false,
            local: false,
            localPath: null,
            remotePath: path,
            filename
          }
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

  function finalizeBookDownloadSuccess(id, localPath) {
    return {
      list: state.list,
      listById: Object.assign({}, state.listById, {
        [id]: Object.assign({}, state.listById[id], {
          downloading: null,
          local: true,
          localPath: localPath
        })
      })
    }
  }

  function finalizeBookDownloadError(id, err) {
    return {
      list: state.list,
      listById: Object.assign({}, state.listById, {
        [id]: Object.assign({}, state.listById[id], {
          downloading: false,
          local: false,
          path: null,
          error: err.message
        })
      })
    }
  }

  switch (action.type) {
    case 'UPDATE_BOOKS':
      return updateList(action);
    case 'DOWNLOADING_BOOK':
      return updateListItemAttribute(action.id, 'downloading', true);
    case 'DOWNLOADING_BOOK_DONE':
      return finalizeBookDownloadSuccess(action.id, action.localPath);
    case 'DOWNLOADING_BOOK_FAIL':
      return finalizeBookDownloadError(action.id, action.err);
  }
  return state;
}
