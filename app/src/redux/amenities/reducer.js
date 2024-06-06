const initialState = {
  aminitiesState: 0,
  amenities: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_AMENITIES_PENDING':
      return {...state, aminitiesState: 1};
    case 'GET_AMENITIES_FULFILLED':
      return {...state, aminitiesState: 2, amenities: action.payload.data};
    case 'GET_AMENITIES_REJECTED':
      return {...state, aminitiesState: 3};

    default:
      return state;
  }
};

export default reducer;
