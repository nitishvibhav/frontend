const initialState = {
  aminitiesCategoryState: 0,
  amenitiesCategory: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_AMENITIESCATEGORY_PENDING':
      return {...state, aminitiesCategoryState: 1};
    case 'GET_AMENITIESCATEGORY_FULFILLED':
      return {...state, aminitiesCategoryState: 2, amenitiesCategory: action.payload.data};
    case 'GET_AMENITIESCATEGORY_REJECTED':
      return {...state, aminitiesCategoryState: 3};

    default:
      return state;
  }
};

export default reducer;
