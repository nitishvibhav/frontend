const initialState = {
  deleteState: 0,
  uploadState: 0,
  todoDocument: [],
  getDocumentByIdState:0,
  getDocumentByLinkedId:[],
  updateState:0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle delete document actions
    case 'UPDATE_DOCUMENT_PENDING':
      return {...state, updateState: 1};
    case 'UPDATE_DOCUMENT_FULFILLED':
      return {...state, updateState: 2, todoDocument: action.payload.data};
    case 'UPDATE_DOCUMENT_REJECTED':
      return {...state, updateState: 3};

    // Handle upload document actions
    case 'UPLOAD_DOCUMENT_PENDING':
      return {...state, uploadState: 1};
    case 'UPLOAD_DOCUMENT_FULFILLED':
      return {...state, uploadState: 2, todoDocument: action.payload.data};
    case 'UPLOAD_DOCUMENT_REJECTED':
      return {...state, uploadState: 3};

    // Handle upload document actions
    case 'GET_DOCUMENT_BY_LINKEDID_PENDING':
      return {...state, getDocumentByIdState: 1};
    case 'GET_DOCUMENT_BY_LINKEDID_FULFILLED':
      return {
        ...state,
        getDocumentByIdState: 2,
        getDocumentByLinkedId: action.payload.data,
      };
    case 'GET_DOCUMENT_BY_LINKEDID_REJECTED':
      return {...state, getDocumentByIdState: 3};

    // Default case
    default:
      return state;
  }
};

export default reducer;
