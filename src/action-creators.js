export function openBook(book) {
  return {
    type: "OPEN_BOOK",
    bookId: book.id
  }
}

export function zoomIn() {
  return {
    meta: { remote: true },
    type: "ZOOM_IN"
  }
}

export function zoomOut() {
  return {
    meta: { remote: true },
    type: "ZOOM_OUT"
  }
}

export function nextPage() {
  return {
    meta: { remote: true },
    type: "NEXT_PAGE"
  }
}

export function prevPage() {
  return {
    meta: { remote: true },
    type: "PREV_PAGE"
  }
}
