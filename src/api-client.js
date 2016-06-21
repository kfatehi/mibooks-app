export function fetchBooks() {
  var url = 'http://192.168.1.58:3000/books.json';
  return fetch(url).then(res => res.text())
  .then(function(resText) {
    return JSON.parse(resText).books;
  })
}

export function getBookURL(path) {
  return 'http://192.168.1.58:3000'+path;
}
