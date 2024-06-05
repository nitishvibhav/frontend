const initialState = {
  roomCategoryState: 0,
  roomCategory: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ROOMCATEGORY_PENDING':
      return {...state, roomCategoryState: 1};
    case 'GET_ROOMCATEGORY_FULFILLED':
      return {...state, roomCategoryState: 2, roomCategory: action.payload.data};
    case 'GET_ROOMCATEGORY_REJECTED':
      return {...state, roomCategoryState: 3};

    default:
      return state;
  }
};

export default reducer;
