export function viewer(state = {}, action) {
  function viewPDF() {
    return {
      url: "http://localhost:3000/book.pdf",
      page: 27,
      scale: 1.0
    }
  }

  function changeZoom(change) {
    return Object.assign({}, {
      url: state.url,
      page: state.page,
      scale: state.scale+change
    })
  }

  function changePage(change) {
    let page = state.page+change;
    if (page < 0) return state;
    return Object.assign({}, {
      url: state.url,
      scale: state.scale,
      page
    })
  }

  switch (action.type) {
    case 'INIT':
      return viewPDF();
    case 'ZOOM_IN':
      return changeZoom(0.1);
    case 'ZOOM_OUT':
      return changeZoom(-0.1);
    case 'NEXT_PAGE':
      return changePage(1);
    case 'PREV_PAGE':
      return changePage(-1);
  }
  return state;
}
