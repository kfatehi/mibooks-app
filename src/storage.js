import { AsyncStorage } from 'react-native';

export function getLocalBooks() {
  return AsyncStorage.getItem('LOCAL_BOOKS').then(function(val) {
    if (val) {
      return JSON.parse(val);
    } else {
      return [];
    }
  });
}

export function setLocalBooks(books) {
  return AsyncStorage.setItem('LOCAL_BOOKS', JSON.stringify(books));
}
