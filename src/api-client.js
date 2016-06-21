export function fetchBooks() {
  var url = 'http://192.168.1.58:3000/books.json';
  return fetch(url).then(res => res.text())
  .then(function(resText) {
    return JSON.parse(resText).books;
  })
}
