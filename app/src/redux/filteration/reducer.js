const initialState = {
    getState: 0,
    filteredData: {},
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'POST_FILTERATION_PENDING':
        return {...state, getState: 1};
      case 'POST_FILTERATION_FULFILLED':
        return {...state, getState: 2, filteredData: action.payload.data};
      case 'POST_FILTERATION_REJECTED':
        return {...state, getState: 3};
  
      default:
        return state;
    }
  };
  
  export default reducer;
  