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

export function bookDownloadStarted(id) {
  return { 
    type: "DOWNLOADING_BOOK", id
  }
}

export function bookDownloadFinished(id, localPath) {
  return { 
    type: "DOWNLOADING_BOOK_DONE", id, localPath
  }
}

export function bookDownloadFailed(id, err) {
  return { 
    type: "DOWNLOADING_BOOK_FAIL", id, err
  }
}
