import { getBookURL } from './api-client';
import FileDownload from 'react-native-file-download';
import RNFS from 'react-native-fs';

export function downloadBook(book) {
  var url = getBookURL(book.remotePath);
  var dest = RNFS.DocumentDirectoryPath;
  return FileDownload.download(url, dest, book.filename)
}
